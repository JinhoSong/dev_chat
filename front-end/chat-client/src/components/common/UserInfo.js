import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import red from "@material-ui/core/colors/red";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const UserInfo = ({user}) => {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const img = "https://react.semantic-ui.com/images/avatar/large/matthew.png";
    return (
        <Card className={classes.root} variant="outlined">
            <CardActionArea>
                <CardMedia
                    component="img"
                    className={classes.media}
                    image={img}
                    title="Paella dish"
                />
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {user.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {user.studentId}
                    <br/>
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="large" color="secondary">logout</Button>
            </CardActions>
        </Card>
    );
}

export default UserInfo;