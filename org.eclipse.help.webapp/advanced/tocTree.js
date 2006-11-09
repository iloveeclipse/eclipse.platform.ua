/*******************************************************************************
 * Copyright (c) 2006 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials 
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/

// Tree code specific to the help toc

function selectTopic(topic)
{
    var indexAnchor=topic.indexOf('#');
	var parameters;			
	if (indexAnchor!=-1) {
		var anchor=topic.substr(indexAnchor+1);
		topic=topic.substr(0,indexAnchor);
		parameters = "?topic="+topic+"&anchor="+anchor;	
	} else {
		parameters = "?topic="+topic;
	}
	makeNodeRequest(parameters);	
    return true;
}

function selectTopicById(topic) {
    alert("Select topic by ID: " + topic);
    return true;
}

function setImage(imageNode, isExpanded) {
    var src = imageNode.src;
    if (isExpanded) {   
        if (src.match( /toc_closed.gif$/)) {
            imageNode.src = imagesDirectory + "/toc_open.gif";  
        }
    } else {
        if (src.match(/toc_open.gif$/)) {
            imageNode.src = imagesDirectory + "/toc_closed.gif";  
        }
    }
}

function loadChildren(treeItem) { 
    var parameters = "";
    if (treeItem !== null  && treeItem.nodeid !== null) {
        var topAncestor = getTopAncestor(treeItem);
        parameters += "?toc=";
        parameters += topAncestor.nodeid;
        if (topAncestor !== treeItem) {
            parameters += "&path=";
            parameters += treeItem.nodeid;
        }
    }
    makeNodeRequest(parameters);
}

function makeNodeRequest(parameters) {
    var href = "../tocfragment" + parameters;
    var callback = function(xml) { updateTree(xml);}; 
    var errorCallback = function() { alert("ajax error"); };
    ajaxRequest(href, callback, errorCallback);
}

if (isIE){
   document.onclick = mouseClickHandler;
   document.onmousemove = mouseMoveHandler;
   document.onkeydown = keyDownHandler;
} else {
   document.addEventListener('click', mouseClickHandler, true);
   document.addEventListener('mousemove', mouseMoveHandler, true);
   document.addEventListener('keydown', keyDownHandler, true);
}
