var operators = ["-","+","/","*"];

function calculate(postfixExpression){
	var stack =[];
	var ans =0;
	for (var i=0;i<postfixExpression.length;i++){
		if(!operators.includes(postfixExpression.charAt(i)))
		{
			stack.push(parseInt(postfixExpression.charAt(i)));
		}
		else{
			var b = stack.pop();
			var a = stack.pop();
			if (postfixExpression.charAt(i) == '+'){
				ans = a+b;
			}
			else if (postfixExpression.charAt(i) == '-'){
				ans = a-b;
			}
			else if (postfixExpression.charAt(i) == '*'){
				ans = a*b;
			}
			else if (postfixExpression.charAt(i) == '/'){
				ans = a/b;
			}
			
			stack.push(ans);
		}
		
	}
	var answer = stack.pop();
	document.getElementById("answer").innerHTML = "Answer: "+answer;
	
}

function infixToPostfix(){
	var infixExpression = document.getElementById("postfix").value;

	var start = 0;
	var stack=[];
	var precedence ={
		"+":1,
		"-":1,
		"*":2,
		"/":2
		
	};
	var postfixExpression ="";
	for (var i=0;i<infixExpression.length;i++){
		if(operators.includes(infixExpression.charAt(i))){
			postfixExpression+=infixExpression.substring(start,i);
			start = i+1;
			if(stack.length==0){
				stack.push(infixExpression.charAt(i));
			}
			else{
				while (stack.length>0 && precedence[infixExpression.charAt(i)] <= precedence[stack[stack.length-1]]){
					postfixExpression += stack.pop();
					
				}
				stack.push(infixExpression.charAt(i));
			}
				
		}
	}
	postfixExpression += infixExpression.substring(start,infixExpression.length);
	
	while(stack.length>0){
		postfixExpression += stack.pop();
		
	}
	calculate(postfixExpression);
	
	
}