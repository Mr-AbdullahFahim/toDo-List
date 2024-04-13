const listContainer = document.getElementById('listContainer');
const addButton = document.getElementById('addButton');
let doneButton;
let deleteButton;
let enterButton;
let counter=-1;
let enterId;
let doneId;
let deleteId;
let inputId;
let input;
let inputValue;
let inputPara;
let inputParaId;
let toDoList = [];
let listId;
let checker=false;
let hrId;


function addList(){
	counter+=1;

	enterId=`enter${counter}`;
	doneId=`done${counter}`;
	deleteId=`delete${counter}`;
	inputId=`inputList${counter}`;
	inputParaId=`para${counter}`;
	listId=`list${counter}`;
	hrId=`hrline${counter}`;

	addButton.classList.add('hide');
	const HTMLString = `
	<li id="${listId}" class="doLists margin"><div class="listDiv"><input id="${inputId}" class="inputList" type="text" placeholder="Enter your ToDo list"><span class="inputspan hide" id="${inputParaId}"></span></div><div class="buttonDiv"><button id="${enterId}" class="fun">Enter</button><button id="${doneId}" onClick="doneList(this.id)" class="fun hide">Done</button><button id="${deleteId}" onClick="deleteList(this.id)" class="fun hide">Delete</button></div></li><hr id="${hrId}" width="90%" class="hide" style="margin: 5px auto;border:1px solid #fff;">`;
	listContainer.insertAdjacentHTML('beforeend', HTMLString);
	document.getElementById(inputId).focus();

	const newList = document.getElementById(listId);

	setTimeout(() => {newList.classList.add('show');}, 10);

	enterButton = document.getElementById(enterId);
	enterButton.addEventListener('click',enterList);
	document.addEventListener('keypress',(event) => {
		if(event.key==='Enter' & counter>toDoList.length-1){
			enterButton.click();
		}
	});
}

function enterList(){
	doneButton = document.getElementById(doneId);
	deleteButton = document.getElementById(deleteId);
	input=document.getElementById(inputId);
	inputValue=input.value;
	inputPara=document.getElementById(inputParaId);
	

	if(inputValue==''){
		if(!checker){
			listContainer.insertAdjacentHTML('beforeend', `<p class="wrong" id="wrong"><i>Add your list before pressing enter.</i></p>`);
			const wrongList = document.getElementById('wrong');

			setTimeout(() => {wrongList.classList.add('show');}, 10);
			document.getElementById(inputId).classList.add('wrongChange');
			document.getElementById(listId).classList.remove('margin');
			document.getElementById('wrong').classList.add('margin');
		}
		checker=true;
	}
	else{
		if(checker){
			document.getElementById('wrong').remove();
			checker=false;
		}
		inputPara.classList.remove('hide');
		toDoList.push(inputValue);
		input.remove();
		inputPara.innerText=inputValue;
		enterButton.remove();
		doneButton.classList.remove('hide');
		deleteButton.classList.remove('hide');
		addButton.classList.remove('hide');
		document.getElementById(listId).classList.remove('margin');
		document.getElementById(hrId).classList.remove('hide');
	}
}

function doneList(idOfDone){
	let x=idOfDone.replace('done','');
	let doneList=document.getElementById(`para${x}`);
	doneList.innerText='';
	doneList.innerHTML=`<s>${toDoList[x]}</s>`;
	document.getElementById(`done${x}`).remove();
}

function deleteList(idOfDelete){
	let y = idOfDelete.replace('delete','');
	let deleteList=document.getElementById(`list${y}`);
	deleteList.remove();
	document.getElementById(`hrline${y}`).remove();
}


addButton.addEventListener('click',() =>{
	addList();
});