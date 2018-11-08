

export default function(): string{
    return <string>'#'+'0123456789abcdef'.split('').map(function(v: string,i: number,a: string[]){
        return i>5 ? null : a[Math.floor(Math.random()*16)] }).join('');
}
