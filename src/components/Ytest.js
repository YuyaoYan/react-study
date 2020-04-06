var arr=[1,2,3,4,5,6,7],r=2
function sort(){
  var boo = arr.some(i=>{
    if(i>5){
      return true
    }
  })
  return boo
}
var bo = sort()
export default bo;
