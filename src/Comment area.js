function commentmessage(){
    let i=document.getElementById("hide+");
    if(i.style.display=="none")i.style="display:block;";
    else i.style="display:none;";
}
function release(){
    let g=document.getElementById("grade").value;
    let s=document.getElementById("sex").value;
    let a=document.getElementById("age").value;
    let c=document.getElementById("comment").value;
    if(checkInformation(g,s,a,c))return;//检查评论上传是否格式正确
    var d=new Date();
    let D=Number(d);
    localStorage.setItem("1"+"|"+g+"|"+s+"|"+a+"|"+d+"|"+D,c);
    alert("上传成功");//"1"表示服务1(评论区)
    //console.log(g+s+a+c);
    location.href="index.html"
    
}
function displaycomment(){//评论会按时间排序，基本和displaycontent代码相同
    let key=new Array();
    let content=new Array();
    var x=new Array();//标题的html元素
    var y=new Array();//标题的内容
    var X=new Array();//文本的html元素
    var Y=new Array();//文本的内容
    var z=new Array();//删除的按钮的html元素
    var id=document.getElementById("displaycomment");
    let il=0; 
    for(var c=0;c<localStorage.length;c++){//读取所有储存并选出评论区的相关储存(1开头)
        let key0=new Array();
        key0[c]=localStorage.key(c);
        let key0list=key0[c].split("|");
        if(key0list[0]=="1"){key[il]=key0[c];il++;}
    }
    //console.log("0");
    for(var c=0;c<key.length;c++){//读取所有文章到数组并创建标签
        content[c]=localStorage.getItem(key[c]);
        x[c]= document.createElement("button");//创建标题的p标签
        var keylist=key[c].split("|");
        x[c].id=key[c]+"title";//用id记录标题
        let d=keylist[4];
        x[c].class=d;//用class记录上传时间
        y[c] = document.createTextNode("年级："+keylist[1]+" "+" 性别："+" "+keylist[2]+" "+" 年龄："+keylist[3]);
        x[c].appendChild(y[c]);
        X[c]= document.createElement("p");//创建内容的p标签
        X[c].id=key[c]+"content";
        X[c].style="display:block";
        let ttt="上传时间："+keylist[5]+"\n"+content[c];
        content[c]=content[c].replace(/  \s*/g,"\n");//将文本中两个及以上个空白符替换为可以被识别的换行符\n
        Y[c] = document.createTextNode(ttt);
        X[c].appendChild(Y[c]);
        z[c]= document.createElement("button");//创建删除的按钮的button标签
        z[c].id=key[c]+"button";
        z[c].class="BUTTON";
        z[c].style="float:left;font-size:20px;padding:3px;margin:0;background-color:antiquewhite;";
        z[c].innerHTML="删除上述评论";
        }
       // console.log("1");
        let date=new Array();//排序辅助数组，放置要排序的时间
        for(var c=0;c<key.length;c++){
        date[c]=x[c].class;
          }
        date=ShellSort(date);//按日期排序
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
        for(let c=0;c<key.length;c++){
          id.appendChild(x[c]);//插入标题
          if(c==0)X[c].style.display="block";
          id.appendChild(X[c]);//插入文本
          id.appendChild(z[c]);//插入删除按钮
          let v=document.getElementById(X[c].id);
          let V=document.getElementById(x[c].id);
          let Z=document.getElementById(z[c].id);
          V.addEventListener("click", function() {//点击事件：展开或收起记录
            if(v.style.display=="none"){v.style="display:block";}
            else{v.style="display:none";}
          });
          let tt=x[c].id.replace("title","");
          Z.addEventListener("click",function(){//点击事件：删除单个记录
            let ye=confirm("是否删除上述评论？");
            if(ye)localStorage.removeItem(tt);
            location.href="index.html"
          })
        }
        //console.log("2");
    
}
function checkInformation(g,s,a,c){//检查评论上传是否格式正确
  let text="";
  let ye=0;
  g=Number(g);
  a=Number(a);
  //console.log(isNaN(g));
    if(g<2000||g>2023||isNaN(g)){text += "年级输入有误(2000-2023) ";ye=1;}
    if(s!="男"&&s!="女"){text+="性别输入有误(男/女) ";ye=1;}
    if(a>100||a<0||isNaN(a)){text+="年龄输入有误(0-100) ";ye=1;}
    if(c==""){text+="评论不能为空！ ";ye=1;}
 
  document.getElementById("incorrectMessage").innerHTML=text;
  return ye;
}

function searchtext(){
  let i=document.getElementById("hide++");
  if(i.style.display=="none")i.style="display:block;";
  else i.style="display:none;";
}
function Search(){
  let g=document.getElementById("grade+").value;
  let s=document.getElementById("sex+").value;
  let a=document.getElementById("age+").value;
  let key=new Array();
  let il=0; 
  let id="";
    for(var c=0;c<localStorage.length;c++){//读取所有储存并选出评论区的相关储存(1开头)
        let key0=new Array();
        key0[c]=localStorage.key(c);
        let key0list=key0[c].split("|");
        if(key0list[0]=="1"){key[il]=key0[c];il++;}
    }
    for(var c=0;c<key.length;c++){//读取所有文章到数组并创建标签
        var keylist=key[c].split("|");
        if(keylist[1]==g||g==""){
          if(keylist[2]==s||s==""){
            if(keylist[3]==a||a==""){
              id=key[c]+"title";
            }
          }
        }
        }
        if(id!=""){
          location.hash="#"+id;//跳转到找到的第一个评论
        }
        else document.getElementById("promptMessage").innerHTML="抱歉没有找到！";
}