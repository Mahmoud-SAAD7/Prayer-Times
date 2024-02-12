import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import PropTypes from 'prop-types'; // Import PropTypes


export default function PryerCard(props) {
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="390"
          image={props.img}
          alt="green iguana"
          className='h-[300px] w-[300px]' // Set a fixed width for the image
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          
          <Typography gutterBottom variant="h5" component="div">
            {props.time}
          </Typography>
       
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

PryerCard.propTypes = {
  title: PropTypes.string.isRequired, 
  time: PropTypes.string.isRequired, 
  img: PropTypes.string.isRequired, 
};
