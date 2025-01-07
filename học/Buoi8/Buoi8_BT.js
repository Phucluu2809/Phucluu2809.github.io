
function ngto(a){
    if (a<2) return false;
    for (let i = 2 ; i*i <= a ; i++){
        if (a % i == 0) return false;
    }
    return true;
}
function giua( a , b){
    console.log("các số nguyên tố giữa A và B là: ")
    for (let i = a + 1; i < b ; i++){
        if (ngto(i)) console.log(i)
    }
}
function thang(a){
    if (a <= 12 && a>=1 )
        console.log("Tháng ",a);
    else console.log("Không là 1 tháng!!!")
}
function check(s){
    s+=" ";
    let max=0,len=0;
    let max_str="",str="";
    for (let i = 0 ; i <= s.length ; i++){
        if (s[i] != " "){
            str+=s[i];
            len++;
        }
        else{
            if (len > max){
                max_str = str;
                max = len;
            }
            len = 0;
            str = "";
        }
    }
    console.log(max_str);
}
function khoangtrang(s){
    let index_st=0;
    let index_end=s.length;
    for (;;){
        if (s[0] == " ")
            s = s.replace(s[0],"");
        else break;
    for (;;){
        if (s[s.length] == " ")
            s = s.replace(s[0],"");
    }
    return s;
}
let a=7 , b=15;
let s= "chao cac con";
if (ngto(a)) console.log(a ," là số nguyên tố ");
giua(a, b);
thang(a);
check(s);
console.log(khoangtrang(s));