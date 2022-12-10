import React, { Component } from 'react'
import Newslist from './Newslist'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

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
   constructor(){
    super();
    this.state={
        articles: [],
        loading:false,
        page:1

    }
   }
   tot=0;
async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c7278457ce9b41478494160bddbd6270&page=1&pagesize=${this.props.pagesize}`;
    this.setState({loading:true});
    let data=await fetch(url)
    let parsed=await data.json()
    this.setState({articles:parsed.articles,totalResults:parsed.totalResults})
    this.setState({loading:false});

    

}

async updatenews(pageNO){
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c7278457ce9b41478494160bddbd6270&pagesize=${this.props.pagesize}&page=${this.state.page+pageNO}`;
    this.setState({loading:true})

    let data=await fetch(url)
    let parsed=await data.json()
    this.setState({
        articles:parsed.articles,
        page:this.state.page+pageNO,
      
        loading:false

    })

}
handleNext=async()=>{
   
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c7278457ce9b41478494160bddbd6270&pagesize=${this.props.pagesize}&page=${this.state.page+1}`;
    this.setState({loading:true})

    let data=await fetch(url)
    let parsed=await data.json()
    this.setState({
        articles:parsed.articles,
        page:this.state.page+1,
      
        loading:false

    })



    
}
handlePrev=async()=>{

    

    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c7278457ce9b41478494160bddbd6270&pagesize=${this.props.pagesize}&page=${this.state.page-1}`;
    this.setState({loading:true});

    let data=await fetch(url)
    let parsed=await data.json()
    this.setState({
        articles:parsed.articles,
        page:this.state.page-1

    })
    this.setState({loading:false});


}



  render() {
    return (
        <>
      <div className='container my-5'>

        {this.state.loading && <><Spinner/>
        <h2 className='text-center'>Loading Please wait</h2>
        </>
        
        }
        <h1 className='text-center'>Apna news top headlines </h1>
        
        <div className="row">
        { !this.state.loading&&this.state.articles.map((Element)=>{
            return <div className="col-md-4" key={Element.url}>
             <Newslist title={Element.title?Element.title.slice(0,44):""} discription={Element.description?Element.description.slice(0,88):" "} imageUrl={Element.urlToImage?Element.urlToImage:"/"} newsurl={Element.url} publishAt={Element.publishedAt}  Author={Element.author}  source={Element.source.name} />
             </div>
        })}
            
           
        </div>
       

        <div className="container my-3 d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} onClick={this.updatenews(-1)} className="btn btn-info"> &larr; Previous</button>
        <button type="button" disabled={Math.ceil(this.state.page+1>(this.state.totalResults)/this.props.pagesize)} onClick={this.updatenews(+1)} className="btn btn-info">Next &rarr;</button>
        </div>
        
      </div> 
      </>
    )
  }
}
