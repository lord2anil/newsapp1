import React, { useEffect ,useState} from 'react'
import Newslist from './Newslist'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
   
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(0);
  const [totalResults, settotalResults] = useState(0);
  // document.title=`${Captalized(props.category)}-ApnaNews`;



   const Captalized=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1)
   }
   


const  updatenews=async()=>{
  props.setProgress(10);

  let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2e8a19860f60475cb34711e0e53d7178&pagesize=${props.pagesize}&page=${page}`;
    
    setloading(true);
    props.setProgress(20);

    let data = await fetch(url);
    let parsed = await data.json();
    props.setProgress(30);
    setarticles(parsed.articles);

    setloading(false);

    settotalResults(parsed.totalResults);

    props.setProgress(100);

}
useEffect(() => {
  updatenews();
  
})

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

const fetchMoreData =async () => {
  setpage(page+1);
  let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2e8a19860f60475cb34711e0e53d7178&pagesize=${props.pagesize}&page=${page}`;
  

  let data=await fetch(url)
  let parsed=await data.json()
  setarticles(articles.concat(parsed.articles));
  settotalResults(parsed.totalResults);
  
}


  
    return (
        <>
     

        <h1 className='text-center   ' style={{margin:"55px 0px"}}>Apna news top headlines on {Captalized(props.category)} </h1>
        {loading && <><  Spinner/>
        <h2 className='text-center'>Loading Please wait</h2>
        </>
          
           }
          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
          { articles.map((Element)=>{
              return <div className="col-md-4" key={Element.url}>
              <Newslist title={Element.title?Element.title.slice(0,44):""} discription={Element.description?Element.description.slice(0,88):" "} imageUrl={Element.urlToImage?Element.urlToImage:"/"} newsurl={Element.url} publishAt={Element.publishedAt}  Author={Element.author}  source={Element.source.name} />
              </div>
          })}
          </div>
          </div>
       </InfiniteScroll>

        {/* <div className="container my-3 d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} onClick={this.handlePrev} className="btn btn-info"> &larr; Previous</button>
        <button type="button" disabled={Math.ceil(this.state.page+1>(this.state.totalResults)/props.pagesize)} onClick={this.handleNext} className="btn btn-info">Next &rarr;</button>
        </div> */}
        
     
      </>
    )
  
}

News.defaultProps={
  country:'in',
  pagesize:8,
  category:"sports",
 }
News.propTypes={
  country:PropTypes.string,
  category:PropTypes.string,
  pagesize:PropTypes.number
 }
