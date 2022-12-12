import React, { Component } from 'react'
import Newslist from './Newslist'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
   static defaultProps={
    country:'in',
    pagesize:8,
    category:"sports",
   }
   static propTypes={
    country:PropTypes.string,
    category:PropTypes.string,
    pagesize:PropTypes.number
   }
   Captalized=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1)
   }
   constructor(props){
    super(props);
    this.state={
        articles: [],
        loading:true,
        page:1,
        totalResults:0

    }
    document.title=`${this.Captalized(this.props.category)}-ApnaNews`;
    console.log(this.props.category);
   }


async updatenews(pageNO){
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2e8a19860f60475cb34711e0e53d7178&pagesize=${this.props.pagesize}&page=${this.state.page}`;
    this.setState({loading:true})

    let data=await fetch(url)
    let parsed=await data.json()
    this.setState({
        articles:parsed.articles,
              totalResults:parsed.totalResults,
        loading:false
    })
}
async componentDidMount(){
    this.updatenews();
}
// handleNext=async()=>{
//     this.setState({
//       page:this.state.page+1
//     });
//     this.updatenews();
// }
// handlePrev=async()=>{
//   this.setState({
//     page:this.state.page-1
//   });
//   this.updatenews();
// }

fetchMoreData =async () => {
  this.setState({page:this.state.page+1})
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2e8a19860f60475cb34711e0e53d7178&pagesize=${this.props.pagesize}&page=${this.state.page}`;
  

  let data=await fetch(url)
  let parsed=await data.json()
  this.setState({
      articles:this.state.articles.concat(parsed.articles),
            totalResults:parsed.totalResults,
     
  })
};


  render() {
    return (
        <>
     

        <h1 className='text-center   ' style={{margin:"55px 0px"}}>Apna news top headlines on {this.Captalized(this.props.category)} </h1>
        {this.state.loading && <><  Spinner/>
        <h2 className='text-center'>Loading Please wait</h2>
        </>
          
           }
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
          { this.state.articles.map((Element)=>{
              return <div className="col-md-4" key={Element.url}>
              <Newslist title={Element.title?Element.title.slice(0,44):""} discription={Element.description?Element.description.slice(0,88):" "} imageUrl={Element.urlToImage?Element.urlToImage:"/"} newsurl={Element.url} publishAt={Element.publishedAt}  Author={Element.author}  source={Element.source.name} />
              </div>
          })}
          </div>
          </div>
       </InfiniteScroll>

        {/* <div className="container my-3 d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} onClick={this.handlePrev} className="btn btn-info"> &larr; Previous</button>
        <button type="button" disabled={Math.ceil(this.state.page+1>(this.state.totalResults)/this.props.pagesize)} onClick={this.handleNext} className="btn btn-info">Next &rarr;</button>
        </div> */}
        
     
      </>
    )
  }
}
