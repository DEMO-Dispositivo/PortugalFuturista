outlets = 1;
var num = 0, num1 = 1, num2 = 0; 

function bang(){
	num = num1+num2;
	outlet(0, num);
	num2 = num1;
	num1 = num;
}

function restart(){
	num = 0;
	num1 = 1;
	num2 = 0; 
}