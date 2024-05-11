import React from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Rating from '@mui/material/Rating';

export default function GymCard({ name, location, img }) {
    const [ averageRating, setAverageRating ] = React.useState([]);

    React.useEffect(() => {
        const queryParam = { name: name };
        const queryString = new URLSearchParams(queryParam).toString();

        fetch(`http://localhost:3001/api/getAverageRating?${queryString}`, {
            method: 'GET'
        })
        .then((res) => {
            return res.json()
        })
        .then((ratingsData) => {
            const sum = ratingsData.reduce((a, b) => a + b, 0);
            setAverageRating(sum / ratingsData.length)
        })
    }, [])

    return (
        <Box sx={{ maxWidth: 275 }}>
            <Card variant="outlined">
                <CardHeader
                    avatar={
                        <Avatar aria-label="avatar name">
                            {name[0]}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body1">
                        {location}
                    </Typography>
                    <Rating 
                    name="rating"
                    value={averageRating}
                    
                    />
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Box>
    )
}