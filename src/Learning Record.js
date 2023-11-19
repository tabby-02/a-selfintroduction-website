
let KEY="187119";
function check(){
  var key = prompt("管理员密码","187119");
  if(key===KEY)document.getElementById("hide").style.display="block";
  else alert("密码错误");
}
function upload(){
  var i=document.getElementById("Content").value;
  var j=document.getElementById("Title").value;
  var d=new Date();
  let D=Number(d);
  localStorage.setItem("0"+"|"+j+"|"+D+"|"+d,i);alert("上传成功");//"0"代表服务0(学习记录)，"j"为标题，"D""为时间转的数字，"d"为时间字符串
//console.log(j+"|"+D+"|"+d);
  
}
function displaycontent(){
var key= new Array();
var content=new Array();
var x=new Array();//标题的html元素
var y=new Array();//标题的内容
var X=new Array();//文本的html元素
var Y=new Array();//文本的内容
var z=new Array();//删除的按钮的html元素
var id=document.getElementById("displaycontent");
let il=0;
for(var c=0;c<localStorage.length;c++){//读取所有储存并选出学习记录的相关储存(0开头)
  let key0=new Array();
  key0[c]=localStorage.key(c);
  let key0list=key0[c].split("|");
  if(key0list[0]=="0"){key[il]=key0[c];il++;}
}
//console.log(key.length);
//for(let c=0;c<key.length;c++)
//console.log(key[c]);
for(var c=0;c<key.length;c++){//读取所有文章到数组并创建标签
content[c]=localStorage.getItem(key[c]);
x[c]= document.createElement("button");//创建标题的p标签
var keylist=key[c].split("|");
x[c].id=key[c]+"title";//用id记录标题
let d=keylist[2];
x[c].class=d;//用class记录上传时间
y[c] = document.createTextNode(keylist[1]);
x[c].appendChild(y[c]);
X[c]= document.createElement("p");//创建内容的p标签
X[c].id=key[c]+"content";
X[c].style="display:none";
content[c]=content[c].replace(/  \s*/g,"\n");//将文本中两个及以上个空白符替换为可以被识别的换行符\n
let ttt="上传时间："+keylist[3]+"\n"+content[c];
Y[c] = document.createTextNode(ttt);
X[c].appendChild(Y[c]);
z[c]= document.createElement("button");//创建删除的按钮的button标签
z[c].id=key[c]+"button";
z[c].class="BUTTON";
z[c].style="float:left;font-size:20px;padding:3px;margin:0;background-color:antiquewhite;";
z[c].innerHTML="删除上述记录";
}
let date=new Array();//排序辅助数组，放置要排序的时间
for(var c=0;c<key.length;c++){
date[c]=x[c].class;
//console.log(x[c].id);
//console.log(x[c].class);
//console.log(date[c]);
  }
//for(let i=0;i<localStorage.length;i++)
//console.log("排序前"+date[i]);
date=ShellSort(date);//按日期排序
//for(let i=0;i<localStorage.length;i++)
//console.log("排序后"+date[i]);
//for(let i=0;i<localStorage.length;i++)
//console.log("排序前"+x[i].class);
var temp=new Array();
var Temp=new Array();
for(let i=0;i<key.length;i++){//按照顺序排列文章<p>元素
  for(let j=0;j<key.length;j++){
    if(date[j]==x[i].class){
      temp[j]=x[i];Temp[j]=X[i];
    }
  }
}
x=temp;X=Temp;
//for(let i=0;i<localStorage.length;i++)
//console.log("排序后"+x[i].class);

for(let c=0;c<key.length;c++){
  id.appendChild(x[c]);//插入标题
  if(c==0)X[c].style.display="block";
  id.appendChild(X[c]);//插入文本
  id.appendChild(z[c]);//插入删除按钮
  //console.log(c+"key:"+X[c].id);
  let v=document.getElementById(X[c].id);
  let V=document.getElementById(x[c].id);
  let Z=document.getElementById(z[c].id);
  //console.log(z[c].id);
  //console.log(x[c].id);
  V.addEventListener("click", function() {//点击事件：展开或收起记录
    if(v.style.display=="none"){v.style="display:block";}
    else{v.style="display:none";}
   
  });
  let tt=x[c].id.replace("title","");
  //console.log(tt);
  Z.addEventListener("click",function(){//点击事件：删除单个记录
    let ye=confirm("是否删除上述记录？");
    if(ye)localStorage.removeItem(tt);
  })
 
}
}
function ShellSort(a) {//希尔排序  数组a
  let n=a.length;
	for (let gap = Math.trunc(n / 2); gap >= 1;) {
		for (let i = gap; i < n ; i++) {
			let temp = a[i];
			for (let j = i - gap; j >= 0; j -= gap) {
				if (a[j] > temp) {
					a[j + gap] = a[j];
					a[j] = temp;
				}
				else {
					break;
				}
			}
		}
		gap = Math.trunc(gap / 2);
	}
  return a;
}
function Clear(){
  let y=confirm("是否删除所有记录？");
  if(y)localStorage.clear();
}