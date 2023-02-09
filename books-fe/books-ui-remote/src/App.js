import React, {useEffect, useState} from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from "@mui/material/Typography";
import regeneratorRuntime from "regenerator-runtime";

export const App = ({user, token}) => {
    const [books, setBooks] = useState([]);
    const [booksLoaded, setBooksLoaded] = useState(false);

    const fetchBooks = async () => {
        try {
            const booksUrl = 'http://localhost:8092/gate/v1/books?';
            console.log(`sending request: ${booksUrl}`);
            let response = await fetch(booksUrl + new URLSearchParams({
                username: user
            }), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            let json = await response.json();
            return {success: true, data: json};
        } catch (error) {
            console.log(error);
            return {success: false};
        }
    };

    useEffect(() => {
        (async () => {
            setBooksLoaded(false);
            let res = await fetchBooks();
            if (res.success) {
                setBooks(res.data);
                setBooksLoaded(true);
                console.log(books);
            }
        })();
    }, [user]);

    return <div>
        <Typography variant="h3" component="h3">
            Your books
        </Typography>
        <List>
            {books.map((book, index) => (
                <ListItem key={index}><ListItemText primary={book.content}/></ListItem>
            ))}
        </List>
    </div>;
};
export default App;
