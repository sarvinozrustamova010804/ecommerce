class Pagination{
    constructor(totalItems,page,limit){
  this.limit= limit || 14
  this.currentPage = page || 1
  this.totalPage=Math.ceil(totalItems/this.limit)
  this.offSet =(this.currentPage-1)*this.limit
    }
}

module.exports=Pagination