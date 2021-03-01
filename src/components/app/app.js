import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';
import './app.css';
import styled from 'styled-components';
import nextId from "react-id-generator";

const AppBlock = styled.div`
    margin: 30px auto;
    max-width: 800px;  
`;

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [
                {label: 'Going to learn React', important: true, like: false, id: 1},
                {label: 'That is so good', important: false, like: false, id: 2},
                {label: 'I need a break...', important: false, like: false, id: 3}
            ],
            term: '',
            filter: 'all'
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.searchPost = this.searchPost.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);        
    }

    deleteItem(id){
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id );
           
            const before = data.slice(0, index);
            const after = data.slice(index + 1);

            const newArr = [...before, ...after];
            
            return{
                data: newArr
            }
        });
    }

    addItem(body){
        const newItem = {
            label: body,
            important: false,
            id: nextId()
        };
        this.setState(({data}) => {
            const newArr = [...data, newItem];

            return{
                data: newArr
            }
        });        
    }

    onToggle({id, param}){
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];            

            let newItem = {};

            if(param === 'important'){
                newItem = {...old, important: !old.important }
            }         
            else{
                newItem = {...old, like: !old.like};
            }

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return{
                data: newArr
            }
        })
    }

    searchPost(items, term){
        if(term.length === 0){
            return items
        }

        return items.filter( (item) => {
            return item.label.indexOf(term) > -1
        })
    }

    onUpdateSearch(term){
        this.setState({term})
    }

    filterPost(items, filter){
        if(filter === 'like'){
            return items.filter(item => item.like)
        }
        else{
            return items
        }
    }

    onFilterSelect(filter){
        this.setState({filter})
    }

    render(){
        const {data, term, filter} = this.state;
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return(
            <AppBlock>
                <AppHeader 
                    liked={liked}
                    allPosts={allPosts}
                />
                <div className="search-panel d-flex">
                    <SearchPanel 
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <PostStatusFilter 
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
                </div>
                <PostList 
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggle}
                    onToggleLiked={this.onToggle}
                />
                <PostAddForm 
                    onAdd={this.addItem}
                />
            </AppBlock>
        )
    }    
}