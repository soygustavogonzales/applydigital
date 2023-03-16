import React from 'react';
import {useState, useEffect} from 'react';
import './App.css';
import Card from './components/card/card.component';
import TabButton from './components/tabButton/tabButton.component';
import { Post } from './services/post.service'
import { iPost} from './dto/post.interface'
import Select from 'react-select';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';



interface iOption {
  value: string;
  label: string;
}

interface ArrayObjectSelectState {
  selectedOption: iOption | null;
}

const options: iOption[] = [
  { value: 'query=angular&page=0', label: 'Angular' },
  { value: 'query=reactjs&page=0', label: 'React' },
  { value: 'query=vuejs&page=0', label: 'Vue' },
];

let favsList : iPost[] = [];


function App() {
  
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(0)
  const [posts, setPosts] = useState( new Array());
  const [state, setState] = useState<ArrayObjectSelectState>({
    selectedOption: null,
  });

  const fetchPost = async (query:string|null) => {

    if(query != null){
      const data = await Post.getAll(query)
      console.log( data)
      setTotalPages(data?.totalPages)
      const data_ = data?.posts.map( (post:iPost) => {
        const index = favsList.findIndex(post => post.id == post.id)
        if( index > -1) {
          return {
            ...post,
            isFav: post.isFav
          }
        }
        return post
        
      })
      setPosts(data_)
      
    }
  }

  useEffect(() => {

    const localFavList : string = localStorage.getItem("favlist") || ""
    if(localFavList.trim().length > 2)
      favsList = JSON.parse(localFavList); 
    console.log(favsList);

    
    const opt:iOption = JSON.parse(localStorage.getItem("option") || "{}");    
    if(opt.value) {
      setState({ selectedOption: opt})
      fetchPost(opt.value)
    }else {
      fetchPost("")
    }



  }, [])


  const changeSelect = (option: iOption | null) => {

    setState({ selectedOption: option });
    localStorage.setItem("option",window.JSON.stringify(option))
    console.log(option?.value)
    const query = option?.value || '';
    fetchPost( query +'&page='+ page || "")

  };

  const selectFav = (e:any, selected: boolean) => {

    console.log(selected);
    const postString = e.target.dataset.post
    const post:iPost = window.JSON.parse(postString || "{}")
    
    if(selected && post){
      const index = favsList.findIndex( e => e.id == post.id);
      if(index < 0) {
        post.isFav = true;
        favsList.push(post);
        localStorage.setItem("favlist",JSON.stringify(favsList));
      }else {
        console.warn("El elemento ya existia en la lista")
      }
      console.log(favsList)
      
    }
    else{
      const index = favsList.findIndex( e => e.id == post.id);
      favsList.splice(index,1);
      localStorage.setItem("favlist",JSON.stringify(favsList));
      console.log(favsList)
    }
  };

  const viewMyFavsPosts = () => {
    
    console.log(favsList)
    const favs = favsList.map(item => {
     return { 
      ...item,
      isFav:true
    }
    });
    setPosts(favs)
    console.log(favs, posts)

  }
  const viewAllPosts = () => {
    fetchPost("")
  }
  const changePage = (e:any, page:number) => {
    const opt:iOption = JSON.parse(localStorage.getItem("option") || "{}");
    setPage(page)    
    console.log((opt.value||'')+"&page="+page)
    if(opt.value) {
      //setState({ selectedOption: opt})
      fetchPost(opt.value+"&page="+page)
    }else {
      fetchPost("&page="+page)
    }
  };

  return (
    <>
      <div className='header'><div className='title'>HACKER NEWS</div></div> 
      <div className="back">
        <div className="container">
          <TabButton viewMyFavs={viewMyFavsPosts} viewAllPosts={viewAllPosts}/>
          <div className="select-container">
            <Select
              value={state.selectedOption}
              onChange={changeSelect}
              getOptionLabel={(option: iOption) => option.label}
              getOptionValue={(option: iOption) => option.value}
              options={options}
              isClearable={true}
              backspaceRemovesValue={true}
              styles={
                {
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? 'cyan' : 'gray',
                    width: '300px'
                  })
                }
              }
              className="centered"
            />
          </div>
          <div className="cards-list">
            {
              posts.map( (post: iPost, i: number): JSX.Element => {
                return <Card key={i} post={post} onClickFav={selectFav}/>
              })
            }

          </div>
        </div>
        <div className="container">
        <Stack spacing={2} className="paginator">
          <Pagination count={totalPages} onChange={changePage} color="primary" />
        </Stack>
        </div>
      </div>
    </>
  );
}

export default App;
