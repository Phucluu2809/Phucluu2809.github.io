// let : kdl 
// var : biến toàn cục 
// == so sánh + tự ép kiểu
// === so sánh k ép kiểu
// mảng không quy định kdl mỗi ptu 
// let a => chưa định nghĩa(undefined)
// khác
// let b=null => null
// for (let i in arr){
//       i là index
// }
// for (let value in arr){
//     ra value 
// }
// độ dài arr=> arr.length 

//số nguyên
// function isNaturalNumber(let a) {
//     let flag=false
//     if (a%1 == 0) flag=true
//     return flag
// }
// // số tự nhiên 
// function isInteger(let a){
//     let flag=false
//     if (isNaturalNumber(a) && a >= 0)
//         flag=true
//     return flag
// }
// // số nguyên tố 
// function isPrimeNumber (let a) {
//     let flag=false
//     if (isInteger(a)){
//         flag=true 
//         if (i < 2)
//             return false
//         else {
//             for (let i=0 ; i*i<=a;i++)
//                 if (a%i==0)
//                     return false;
//         }
//     }
//     return flag
// }
// arr = [1,2,3,4,5,-5,-6,5.5]
// let s1=0
// let s2=0
// let s3=0
// for (let value in arr){
//     if isInteger(value) s1+=value
//     if isNaturalNumber(value) s2+=value
//     if isPrimeNumber(value) s3+=value
// }
// console.log(s1)
// console.log(s2)
// console.log(s3)

// const Text = document.querySelector("#ID_text")
// const Button = document.querySelector("#ID_button")
// const Text_inp = document.querySelector("#text_in_inp")

// Button.addEventListener(
//     "click" , function (){
//         const val=Text.value
//         if (val=="ABC") {
//             alert("da nhap xong");
//         }
//         alert("nhap sai");
//     }
// );
// Text.addEventListener(
//     "input" , function (){
//         Text_inp.textContent="xau nhap la: " + Text.value;
//     }

// );




const rec_wid = document.querySelector("#ID_width");
const rec_hei = document.querySelector("#ID_height");
const rec_col = document.querySelector("#ID_mau");
const button = document.querySelector("#ID_button");
const rectangle = document.querySelector("#ID_rec");
button.addEventListener("click", function () {
    const width = rec_wid.value;
    const height = rec_hei.value;
    const color = rec_col.value;

    if (width==="" || height==="" || color==="") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    rectangle.style.width = `${width}px`;
    rectangle.style.height = `${height}px`;
    rectangle.style.backgroundColor = `#${color}`;
});
rectangle.addEventListener("click", function () {
    rec_wid.value = "";
    rec_hei.value = "";
    rec_col.value = "";
    rectangle.style.width = "0px";
    rectangle.style.height = "0px";
    rectangle.style.backgroundColor = "red";
});
