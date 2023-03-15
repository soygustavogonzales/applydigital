import React from 'react';
import {useState, useEffect} from 'react';
import './App.css';
import Card from './components/card/card.component';
import TabButton from './components/tabButton/tabButton.component';
import { Post } from './services/post.service'
import { iPost} from './dto/post.interface'
import Select from 'react-select';


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



function App() {
  
  //const [selectedOption, setSelectedOption] = useState(null);
  const [posts, setPosts] = useState( new Array());
  const [state, setState] = useState<ArrayObjectSelectState>({
    selectedOption: null,
  });

  const fetchPost = async (query:string|null) => {
    if(query != null){
      const data = await Post.getAll(query)
      setPosts(data)
      console.log(data)
      
    }
  }

  useEffect(() => {

    const opt:iOption = JSON.parse(localStorage.getItem("option") || "");
    console.log(opt.value)
    if(opt) {
      setState({ selectedOption: opt})
      fetchPost(opt.value)
    }else {
      fetchPost("")
    }

  }, [])


  const changeSelect = (option: iOption | null) => {
    setState({ selectedOption: option });
    localStorage.setItem("option",JSON.stringify(option))
    console.log(option?.value)
    fetchPost(option?.value || "")
  };

  return (
    <>
      <div className='header'><div className='title'>HACKER NEWS</div></div> 
      <div className="back">
        <div className="container">
          <TabButton/>
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
                return <Card key={i} post={post} />
              })
            }

          </div>
        </div>

      </div>
    </>
  );
}

export default App;
