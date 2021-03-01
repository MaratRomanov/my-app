import React from 'react';
import PostListItem from '../post-list-item';
import './post-list.css';
import { ListGroup } from 'reactstrap';

const PostList = ({posts, onDelete, onToggleImportant, onToggleLiked}) => {

    const elements = posts.map((item) => {
        const {id, ...itemProps} = item;
        return(
            <li key={id} className='list-group-item'>
                <PostListItem 
                    {...itemProps}
                    onDelete={() => onDelete(id)}
                    onToggleImportant={() => onToggleImportant({id: id, param: 'important'})}
                    onToggleLiked={() => onToggleLiked({id: id, param: 'liked'})}
                />
            </li>            
        )
    });

    return(
        <ListGroup className="app-list">
            {elements}           
        </ListGroup>
    )
}

export default PostList;