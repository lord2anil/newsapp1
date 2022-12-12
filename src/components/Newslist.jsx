import React from 'react'

export default function Newslist(props) {
  let {title,discription,imageUrl,newsurl,publishAt,Author,source}=props;

  return (
    <div className='container'>
    <div className="card my-3" >
    <span className="position-absolute top-0  translate-middle badge rounded-pill bg-success" style={{zIndex:"1",left:"90%"}}>
            {source}
       </span>
      <a href={newsurl} target="_blank" rel='noreferrer'>
        <img src={imageUrl} className="card-img-top" alt="..."/> </a>
        <div className="card-body">
            <h5 className="card-title">{title}  </h5>
            <p className="card-text">{discription}...</p>
            <p className="card-text"><small className="text-muted">By {!Author?"Unkown":Author} on  {new Date(publishAt).toGMTString()}</small></p>
            <a href={newsurl}  target="_blank" rel='noreferrer' className="btn btn-sm btn-info">Read More</a>
        </div>
        </div>
        
  </div>
  )
}
