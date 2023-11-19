var slideIndex = 1;//当前图片序号（全局变量）
function plusSlides(n) {//展示当前图片序号+n的图片
    showSlides(slideIndex += n);//修改当前图片序号并传入值
}
   
function currentSlide(n) {//
    showSlides(slideIndex = n);//修改当前图片序号并传入n值
}
   
function showSlides(n) {//展示当前图片序号的图片（n只是一个判别用的图片序号的复制数）
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1} 
    if (n < 1) {slideIndex = slides.length}//当图片序号超出最大最小时自动回到范围
    for (i = 0; i < slides.length; i++) {//将所有图片变透明
        slides[i].style.display = "none"; 
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");//将所有索引点的active去除
    }
    slides[slideIndex-1].style.display = "block"; //展示当前序号的图片
    dots[slideIndex-1].className += " active";//将当前展示图片的索引点加active
}
function autochange(){
  plusSlides(1);
  setTimeout(autochange,2000);
}