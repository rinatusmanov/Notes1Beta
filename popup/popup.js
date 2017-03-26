'use strict';

class Folders {
    constructor( 
    isReturn,
    folders = [
    ["Мои записки",0],     
    ["Музыка",0],       
    ["Видео",0],    
    ["Документы",0], 
    null,   
    undefined,   
    ["Изображения",0],    
    ["Прочее",0],    
    ],
    saveFolders = console.log,
    selectFunc = console.log,
    deleteFunc = console.log
    ) { 
        if (!isReturn) 
            return;    
        this.selectFunc = selectFunc;
        this.deleteFunc = deleteFunc;
        this.selected = false;
        this.folders = folders;
        this.saveFolders = saveFolders;      
        this.div = document.createElement("DIV");
        this.div.links = this;
        this.div.className = "folderDivVT";
        this.divMenu = document.createElement("DIV");
        this.divMenu.className = "folderMenuVT";
        this.divMenu.innerHTML = "<div class='replaceFolder' title='Перенести папку'  tabindex='1'></div><div class='renameFolder' title='Переименовать папку (F2)'  tabindex='1'></div><div class='deleteFolder' title='Удалить папку (Del)'  tabindex='1'></div><div class='addFolder' title='Добавить папку (Ins)'  tabindex='1'></div><div class='expandFolder' title='Раскрыть все (+)'  tabindex='1'></div><div class='foldFolder' title='Свернуть все (-)'  tabindex='1'></div>";
        this.divMenu.links = this; 
        this.result = document.createElement("DIV");
        this.result.appendChild(this.divMenu);
        this.result.appendChild(this.div);
        this.div.addEventListener("click",function (e) {
            try {
                this.links.clickP(this.querySelector("p:focus"));
            } catch (ex) {}
        });
        this.div.addEventListener("dblclick",function (e) {    
            try {
                this.links.clickP(this.querySelector("p:focus"));
                this.querySelector("p:focus").parentNode.classList.toggle("active"); 
            } catch (ex) {}
        });
        this.div.addEventListener("keydown",function (e) { 
            var parentN = this.querySelector("p:focus").parentNode; 
            var th = false;
            var divs = this.querySelectorAll("DIV");
            for (var i = 0; i < divs.length; i++) 
                    if (divs[i] == parentN)
                        th = i;  
            var rep = -1; 
            var objBounding = false;  
            switch(true) { 
                case (e.keyCode == 40) && (e.which == 40): 
                        for (var i = th + 1; i < divs.length; i++) {
                            objBounding = divs[i].getBoundingClientRect();
                            if (rep == -1)
                                if ((objBounding["top"] == 0) && (objBounding["bottom"] == 0) && (objBounding["left"] == 0) && (objBounding["right"] == 0) && (objBounding["width"] == 0)) 
                                    rep = -1;   
                                else
                                    rep = i;
                        } 
                        if (rep == -1)
                            for (var i = 0; i < th; i++) {
                                objBounding = divs[i].getBoundingClientRect();
                                if (rep == -1) {
                                    if ((objBounding["top"] == 0) && (objBounding["bottom"] == 0) && (objBounding["left"] == 0) && (objBounding["right"] == 0) && (objBounding["width"] == 0)) 
                                        rep = -1;   
                                    else
                                        rep = i;
                                }  
                        }
                        this.links.clickP(divs[rep].querySelector("p"));  
                    break;  
                case (e.keyCode == 38) && (e.which == 38): 
                        for (var i = th - 1; i > -1; i--) {
                            objBounding = divs[i].getBoundingClientRect();
                            if (rep == -1)
                                if ((objBounding["top"] == 0) && (objBounding["bottom"] == 0) && (objBounding["left"] == 0) && (objBounding["right"] == 0) && (objBounding["width"] == 0)) 
                                    rep = -1;   
                                else
                                    rep = i;
                        } 
                        if (rep == -1)
                            for (var i = divs.length - 1; i > th - 1; i--) {
                                objBounding = divs[i].getBoundingClientRect();
                                if (rep == -1) {
                                    if ((objBounding["top"] == 0) && (objBounding["bottom"] == 0) && (objBounding["left"] == 0) && (objBounding["right"] == 0) && (objBounding["width"] == 0)) 
                                        rep = -1;   
                                    else
                                        rep = i;
                                }    
                            }                
                        this.links.clickP(divs[rep].querySelector("p"));
                    break;      
                case (e.keyCode == 39) && (e.which == 39): 
                        if (!parentN.classList.contains("active"))
                            parentN.classList.add("active"); 
                    break; 
                case (e.keyCode == 37) && (e.which == 37): 
                        if (parentN.classList.contains("active"))
                            parentN.classList.remove("active");
                    break;
                case (e.keyCode == 113) && (e.which == 113): 
                        this.links.renameFolder(this.links);
                        this.links.contextDiv.style.display = "none";
                    break;   
                case (e.keyCode == 46) && (e.which == 46):      
                            this.links.deleteFolder(this.links);
                            this.links.contextDiv.style.display = "none";
                    break;  
                case (e.keyCode == 45) && (e.which == 45):      
                        this.links.addNewFolder(this.links);
                        this.links.contextDiv.style.display = "none";
                    break; 
                 
                case (e.keyCode == 107) && (e.which == 107): 
                    var divs = this.links.div.querySelectorAll("DIV.folder");
                    for (var i = 0; i < divs.length; i++) 
                        if (!divs[i].classList.contains("active"))
                            divs[i].classList.add("active");    
                        this.links.contextDiv.style.display = "none";  
                    break;
                case (e.keyCode == 109) && (e.which == 109): 
                    var divs = this.links.div.querySelectorAll("DIV.folder:not(:first-child)");
                        for (var i = 0; i < divs.length; i++) 
                            if (divs[i].classList.contains("active"))
                                divs[i].classList.remove("active");  
                        this.links.div.querySelector("DIV.folder:first-child > p").focus(); 
                        this.links.contextDiv.style.display = "none";     
                    break;    
            }           
        });
        this.div.addEventListener("contextmenu",function (e) {   
            try { 
                var p = this.querySelector("p:focus");
                this.links.clickP(p);
                this.links.contextDiv.style.display = "block"; 
                this.links.contextDiv.style.left = (p.getBoundingClientRect()["left"]+ 50) + "px"; 
                this.links.contextDiv.style.top = (p.getBoundingClientRect()["top"]+ 10) + "px";
                e.returnValue = false; 
            } catch (ex) {}
        });
        this.contextDiv = document.createElement("DIV");
        this.contextDiv.className = "folderContext";          
        this.contextDiv.links = this;
        this.contextDiv.style.display = "none";    
        this.contextDiv.innerHTML = '<div class="addFolder"  tabindex="1">Ins Создать подпапку</div><div class="renameFolder"  tabindex="1">F2&nbsp; Переименовать</div><div class="replaceFolder"  tabindex="1">&nbsp;&nbsp;&nbsp; Перенести</div><div class="deleteFolder"  tabindex="1">DEL Удалить</div><div class="Cancel"  tabindex="1">&nbsp;&nbsp;&nbsp; Отмена</div>';
        
        this.contextDiv.addEventListener("click",function () {                
                switch (this.querySelector("DIV:focus").className) {
                    case "addFolder":      
                            this.links.addNewFolder(this.links);
                            this.links.contextDiv.style.display = "none";
                        break;       
                    case "renameFolder":      
                            this.links.renameFolder(this.links);
                            this.links.contextDiv.style.display = "none";
                        break;  
                    case "deleteFolder":      
                            this.links.deleteFolder(this.links);
                            this.links.contextDiv.style.display = "none";
                        break;       
                    case "Cancel": 
                            this.style.display = "none";
                        break;   
                }
        });
        this.divMenu.addEventListener("click",function () {
                switch (this.querySelector("DIV:focus").className) {
                    case "addFolder":      
                            this.links.addNewFolder(this.links);
                            this.links.contextDiv.style.display = "none";
                        break;    
                    case "renameFolder":      
                            this.links.renameFolder(this.links);
                            this.links.contextDiv.style.display = "none";
                        break;    
                    case "deleteFolder":      
                            this.links.deleteFolder(this.links);
                            this.links.contextDiv.style.display = "none";
                        break;   
                    case "expandFolder": 
                        var divs = this.links.div.querySelectorAll("DIV.folder");
                        for (var i = 0; i < divs.length; i++) 
                            if (!divs[i].classList.contains("active"))
                                divs[i].classList.add("active");    
                            this.links.contextDiv.style.display = "none";  
                        break;
                    case "foldFolder": 
                        var divs = this.links.div.querySelectorAll("DIV.folder:not(:first-child)");
                            for (var i = 0; i < divs.length; i++) 
                                if (divs[i].classList.contains("active"))
                                    divs[i].classList.remove("active");  
                            this.links.div.querySelector("DIV.folder:first-child > p").focus(); 
                            this.links.contextDiv.style.display = "none";     
                        break;
                }
        });
        document.body.appendChild(this.contextDiv); 
        this.createFolders();
    }
    selectP(p) {
        var selecteds = this.div.querySelectorAll("p.selected");
        for (var i = selecteds.length - 1; i > -1; i--)
            selecteds[i].classList.remove("selected");
        p.classList.add("selected");    
        this.selectFunc(p);
    }
    clickP(p) {
        p.focus();       
        this.selectP(p);
        this.selected = p;                           
        this.contextDiv.style.display = "none"; 
    }
    createFolders() {
        this.div.innerHTML = "";
        for (var i = 0; i < this.folders.length; i++) {
            try {
                var div = document.createElement("DIV");
                div.className = "folder";
                div.id = "folder" + i;
                div.dataset.id = i;
                div.dataset.parent = this.folders[i][1];
                div.innerHTML = "<p tabindex='1' onfocus='this.click();' onclick1='showFolder(this.parentNode);'  oncontextmenu1='contextFolder(this.parentNode,event);return false;';>" + this.folders[i][0] + "</p>";
                div.querySelector("P").addEventListener("focus",function (e) { 
                    this.click();
                });
                this.div.appendChild(div);
            } catch (ex) {}    
        }
        
        for (var i = 0; i < this.folders.length; i++) {
            try {
                this.div.querySelector("#folder" + this.folders[i][1]).appendChild(this.div.querySelector("#folder" + i));
            } catch (ex) {}    
        } 
        try {
            this.clickP(this.div.querySelector("DIV.folder:first-child > p"));   
        } catch (ex) {}    
    }
    addNewFolder(links) {
        var newFolder = prompt("Введите название новой папки\r\n");
        if ((newFolder != "") && (newFolder != null)) {
            var ln = links.folders.length    
            links.folders[ln] = [newFolder,links.selected.parentNode.dataset.id]; 
            var div = document.createElement("DIV");
            div.className = "folder";
            div.id = "folder" + ln;
            div.dataset.id = ln;
            div.dataset.parent = links.selected.parentNode.dataset.id;
            div.innerHTML = "<p tabindex='1'>" + newFolder + "</p>";
            links.div.querySelector("#folder" + links.selected.parentNode.dataset.id).appendChild(div);                                  
            links.saveFolders(links.folders);
            if (!links.div.querySelector("#folder" + links.selected.parentNode.dataset.id).classList.contains("active"))
                links.div.querySelector("#folder" + links.selected.parentNode.dataset.id).classList.add("active");
            links.clickP(div.querySelector("p"));
        }
    }
    renameFolder(links){
        var newFolder = prompt("Введите новое название папки\r\n" + links.selected.innerHTML,links.selected.innerHTML);  
        if ((newFolder != "") && (newFolder != null)) {
            links.selected.innerHTML = newFolder;
            links.folders[links.selected.parentNode.dataset.id][0] = newFolder;                     
            links.saveFolders(links.folders);
        }
    }
    deleteFolder(links){                         
        var id = links.selected.parentNode.dataset.id;
        if (id == 0) {
            alert("Нельзя удалять главную папку");
            return;
        }
        var delFolder = confirm("Вы точно хотите удалать папку '" + links.selected.innerHTML + "' и все ее содержимое?\r\n\r\nВложенные папки и их содержимое удалено не будет.\r\n");
        if (delFolder) {
            var parendDiv = links.selected.parentNode.parentNode.id;
            links.folders[links.selected.parentNode.dataset.id] = null;     
            links.createFolders();  
            var div = links.div.querySelector("#" + parendDiv);
            div.classList.add("active");
            while (true) {
                div = div.parentNode;             
                if (div.classList.contains("folderDivVT"))
                    break;   
                div.classList.add("active");
            }
            links.clickP(links.div.querySelector("#" + parendDiv + " > P"));
            links.deleteFunc(id);   
            links.saveFolders(links.folders); 
            return;        
        }        
    }
}
var folders = [];
var Notes = {};
getNotesArray();   
getFoldersArray(); 

function makeHash(leng = 32) {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyzQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
    for( var i=0; i < leng; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    if (Notes[text] != undefined) 
        text = makeHash(leng);       
    return text;
}


function getFoldersArray() {
    if (localStorage["folders"] != undefined) {
        folders = JSON.parse(localStorage["folders"]);
    } else {                              
        folders = [];  
        folders[0] = ["Мои заметки",0];
        folders[1] = ["Музыка",0];
        folders[2] = ["Видео",0];
        folders[3] = ["Документы",0];
        folders[4] = ["Изображения",0];
        folders[5] = ["Прочее",0];
        folders[6] = ["Сайты",0];
        setFoldersArray();
    }
    return folders;
}

function setFoldersArray() {
   localStorage["folders"] = JSON.stringify(folders,"",4);
} 

function getNotesArray() {
    if (localStorage["Notes"] != undefined) {
        Notes = JSON.parse(localStorage["Notes"]);
    } else { 
        Notes = {};
        setNotesArray();
    }
    return folders;
}

function setNotesArray() {
   localStorage["Notes"] = JSON.stringify(Notes,"",4);
} 

function selectFolder(a) {
    createNoteListing(a.parentNode.dataset.id);
}

function deleteFolder(a) {
    console.log(a); 
    var keys = Object.keys(Notes);
    var s = "";
    for (var i = 0; i < keys.length; i++) {
        try {
            if (Notes[keys[i]]["cat"] == a)
                delete  Notes[keys[i]];
        } catch (ex) {} 
    }   
    setNotesArray();               
    createNoteListing(document.querySelector("#catId").value);   
    createFindListing(); 
}
function createNoteListing(a) {
    var keys = Object.keys(Notes);
    var s = "";
    for (var i = 0; i < keys.length; i++) {
        try {
            if (Notes[keys[i]]["cat"] == a)
                s += "<tr><td tabindex='1'  title='" + Notes[keys[i]]["body"] + "' data-key='" + keys[i] + "' data-cat='" + Notes[keys[i]]["cat"] + "'>" + Notes[keys[i]]["title"] + "</td></tr>";
        } catch (ex) {}
    }
    document.querySelector("#contentTable").innerHTML = s;
}
window.addEventListener("load",function () {
    document.querySelector("#contentTable").addEventListener("click",function () {
        var key = this.querySelector("td:focus").dataset.key;     
        var cat = this.querySelector("td:focus").dataset.cat;
        document.querySelector("#addNewNote").style.display = "block";    
        document.querySelector("#catId").value = cat; 
        document.querySelector("#catName").value = folders[cat][0];
        document.querySelector("#title").value = Notes[key]["title"];   
        document.querySelector("#body").value = Notes[key]["body"];   
        document.querySelector("#keyId").value = key;         
        document.querySelector("#deleteNote").style.display = "inline";
    });
    
    document.querySelector("#resultsFindFile > table").addEventListener("click",function () {
        var key = this.querySelector("td:focus").dataset.key;
        var cat = this.querySelector("td:focus").dataset.cat;
        document.querySelector("#addNewNote").style.display = "block";       
        document.querySelector("#catId").value = cat; 
        document.querySelector("#catName").value = folders[cat][0]; 
        document.querySelector("#title").value = Notes[key]["title"];   
        document.querySelector("#body").value = Notes[key]["body"];   
        document.querySelector("#keyId").value = key;        
        document.querySelector("#deleteNote").style.display = "inline";
    });
    var foldersObj = new Folders(true,folders,setFoldersArray,selectFolder,deleteFolder); /* ,
    selectFunc = console.log,
    deleteFunc = console.log);  */ 
    foldersObj.result.id = "folderMainDiv"; 
    document.body.appendChild(foldersObj.result);
    document.querySelector("#findInput").addEventListener("input",function (){
        createFind(this);    
    });
    document.querySelector("#cancelNote").addEventListener("click",function (){
        document.querySelector("#addNewNote").style.display = "none";    
    });        
    document.querySelector("#addButton").addEventListener("click",function (){ 
        document.querySelector("#addNewNote").style.display = "block"; 
        document.querySelector("#catName").value = folders[foldersObj.selected.parentNode.dataset.id][0]; 
        document.querySelector("#catId").value = foldersObj.selected.parentNode.dataset.id; 
        document.querySelector("#title").value = "";   
        document.querySelector("#body").value = ""; 
        document.querySelector("#keyId").value = "";
        document.querySelector("#deleteNote").style.display = "none";   
    });
    
    document.querySelector("#deleteNote").addEventListener("click",function (){ 
        if (document.querySelector("#keyId").value == "")
            return;
        var key = document.querySelector("#keyId").value;
        Notes[key] = null; 
        delete Notes[key];      
        document.querySelector("#addNewNote").style.display = "none";
        setNotesArray();               
        createNoteListing(document.querySelector("#catId").value);   
        createFindListing(); 
    });
    
            
    document.querySelector("#saveNote").addEventListener("click",function (){
        if (document.querySelector("#title").value.replace(new RegExp(" ","g"),"") == "")
            return
        if (document.querySelector("#body").value.replace(new RegExp(" ","g"),"") == "")
            return
        if (document.querySelector("#keyId").value == "")
            var key = makeHash(100);
        else
            var key = document.querySelector("#keyId").value;
        Notes[key] = {"cat" : document.querySelector("#catId").value,
        "title" : document.querySelector("#title").value,
        "body" : document.querySelector("#body").value,
        "date" : (new Date()).getTime(),
        "hash1" : makeHash(),
        "hash2" : makeHash(),
        "hash3" : makeHash() }
        setNotesArray();       
        createNoteListing(document.querySelector("#catId").value);   
        createFindListing(); 
        document.querySelector("#addNewNote").style.display = "none"; 
    });               
});
function createFindListing() {
    var val = document.querySelector("#findInput").value;
    var keys = Object.keys(Notes);
        var s = "";
        for (var i = 0; i < keys.length; i++) {
            try {
                if (Notes[keys[i]]["title"].indexOf(val) != -1)
                    s += "<tr><td tabindex='1' title='" + Notes[keys[i]]["body"] + "'  data-cat='" + Notes[keys[i]]["cat"] + "' data-key='" + keys[i] + "'>" + Notes[keys[i]]["title"] + "</td></tr>";
            } catch (ex) {}
        }
    document.querySelector("#resultsFindFile > table").innerHTML = s;
}     
function  createFind(a) {
    
    if (a.value.replace(new RegExp(" ","g"),"") != "") {
        console.log(a,a.getBoundingClientRect());
        var leftCR = a.getBoundingClientRect()["left"];
        var topCR = a.getBoundingClientRect()["top"];
        var widthCR = a.getBoundingClientRect()["width"]; 
        var bottomCR = a.getBoundingClientRect()["bottom"];        
        a.style.position = "fixed";
        console.log(topCR)
        a.style.top = topCR + "px";
        a.style.left = leftCR + "px";
        a.style.width = widthCR + "px";
        a.style.zIndex = "10000";
        a.style.background = "rgba(255,255,255,1);";
        createFindListing(); 
        document.querySelector("#resultsFindFile").appendChild(a);
        
        setTimeout( function () {
            a.focus();
        },10);
        document.querySelector("#resultsFindFile").style.display = "block"; 
    } else {
        document.querySelector("#findDiv").appendChild(a);
        a.style.position = "static";     
        a.style.top = "";
        a.style.left = "";
        a.style.width = "";                                               
        document.querySelector("#resultsFindFile").style.display = "none";
        setTimeout( function () {
            a.focus();
        },10);
    }
}