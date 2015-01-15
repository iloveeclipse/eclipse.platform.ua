/*******************************************************************************
 * Copyright (c) 2011 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.help.internal.webapp.parser;

import java.util.Properties;

import org.eclipse.help.internal.webapp.utils.JSonHelper;
import org.eclipse.help.internal.webapp.utils.XMLHelper;
import org.xml.sax.Attributes;

public class IndexParser extends ResultParser {

	private ParseElement element = null;

	public IndexParser() {
		super(JSonHelper.TITLE);
	}
	
	@Override
	public void startElement(String uri, String lname, String name, Attributes attrs) {
		if (name.equalsIgnoreCase(XMLHelper.ELEMENT_INDEX_CONTRIBUTIONS) 
				|| name.equalsIgnoreCase(XMLHelper.ELEMENT_INDEX))
			return;
		
		Properties properties = new Properties();
		properties.put(JSonHelper.PROPERTY_NAME, name);
		for (int i = 0; i < attrs.getLength(); i++) {
			String qname = attrs.getQName(i);
			String val = attrs.getValue(i);
			properties.put(qname, val);
		}
		
		ParseElement elem = new ParseElement(properties, element);
		if (element != null)
			element.addChild(elem);
		else
			items.add(elem);
		
		element = elem;
		
	}
	
	@Override
	public void endElement(String uri, String lname, String name) {
		if (name.equalsIgnoreCase(XMLHelper.ELEMENT_INDEX_CONTRIBUTIONS) 
				|| name.equalsIgnoreCase(XMLHelper.ELEMENT_INDEX))
			return;
		
		if (element != null) {
			element = element.getParent();
		}		
	}

}
