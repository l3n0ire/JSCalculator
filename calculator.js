var operators = ["-","+","÷","X","*",'/'];
var gobalAns=0;
var isDone=false;

function calculate(postfixExpression){
	var stack =[];
	var ans =0;
	for (var i=0;i<postfixExpression.length;i++){
		if(!operators.includes(postfixExpression[i]))
		{
			stack.push(parseInt(postfixExpression[i]));
		}
		else{
			var b = stack.pop();
			var a = stack.pop();
			if (postfixExpression[i] == '+'){
				ans = a+b;
			}
			else if (postfixExpression[i] == '-'){
				ans = a-b;
			}
			else if (postfixExpression[i] == 'X' || postfixExpression[i] == '*'){
				ans = a*b;
			}
			else if (postfixExpression[i] == '÷' || postfixExpression[i] == '/' ){
				ans = a/b;
			}
			
			stack.push(ans);
		}
		
	}
	var answer = stack.pop();
	globalAns=answer;
	document.getElementById("textfield").value=answer;
	isDone=true;	
}

function infixToPostfix(){
	var infixExpression = "";
	infixExpression = document.getElementById("textfield").value;

	var start = 0;
	var stack=[];
	var precedence ={
		"+":1,
		"-":1,
		"X":2,
		"÷":2,
		"*":2,
		"/":2
		
		
	};
	var postfixExpression =[];
	for (var i=0;i<infixExpression.length;i++){
		if(operators.includes(infixExpression.charAt(i))){
			postfixExpression.push(infixExpression.substring(start,i));
			start = i+1;
			if(stack.length==0){
				stack.push(infixExpression.charAt(i));
			}
			else{
				while (stack.length>0 && precedence[infixExpression.charAt(i)] <= precedence[stack[stack.length-1]]){
					postfixExpression.push(stack.pop());
					
				}
				stack.push(infixExpression.charAt(i));
			}
				
		}
	}
	postfixExpression.push(infixExpression.substring(start,infixExpression.length));
	
	while(stack.length>0){
		postfixExpression.push(stack.pop());
		
	}
	calculate(postfixExpression);
	
	
}

function buttonPress(buttonID){
	var textfield = document.getElementById("textfield");
	if(!isDone){
	
		var text = textfield.value;
		text+=buttonID
		textfield.value = text;
	}
	else{
		textfield.value = globalAns+buttonID;
		isDone=false;
	}
}

function del(){
	var textfield = document.getElementById("textfield");
	var text = textfield.value;
	text=text.substring(0,text.length-1);
	textfield.value =text;


}

function ac(){
	var textfield = document.getElementById("textfield");
	textfield.value="";
	isDone=false;
	
}

function ansFunction(){
	var textfield = document.getElementById("textfield");
	var text = textfield.value;
	textfield.value = text+globalAns;
	
}

function onKeyDown(event){
	var key = event.keyCode;
	// enter key
	if(key==13){
		infixToPostfix();
	}
	// alt key
	else if(key==18){
		ac();
	}
		
}
(function(){
	document.getElementById("textfield").focus();
}());