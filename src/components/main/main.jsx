import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import PryerCard from "../card/card";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useState , useEffect} from "react";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar";
moment.locale("ar");

export default function Hero() {
    const [city, setCity] = React.useState('Sohag');
    const [times, setTimes] = useState({
        "Fajr": "05:03",
        "Sunrise": "06:28",
        "Dhuhr": "12:04",
        "Asr": "15:15",
        "Maghrib": "17:40",
        "Isha": "19:10",
    });

    const handleChange = (event) => {
        setCity(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt&method=8`);
            setTimes(data.data.data.timings);
        };

        fetchData();
    }, [city]);

    const [countdown, setCountdown] = useState('');
    const [nextPrayer, setNextPrayer] = useState('');

    useEffect(() => {
        const calculateCountdown = () => {
            const now = moment();
            const prayerTimes = Object.entries(times).map(([key, value]) => ({ name: key, time: moment(value, 'HH:mm') }));
            const nextPrayerTime = prayerTimes.find(prayer => prayer.time.isAfter(now));
            if (nextPrayerTime) {
                const remainingTime = moment.duration(nextPrayerTime.time.diff(now));
                setCountdown(remainingTime.hours() + ':' + remainingTime.minutes() + ':' + remainingTime.seconds());
                setNextPrayer(nextPrayerTime.name);
                // console.log("Next Prayer:", nextPrayerTime.name);
            }
        };
    
        const timer = setInterval(() => {
            calculateCountdown();
        }, 1000);
    
        // Clear the interval
        return () => clearInterval(timer);
    }, [times]);

    return (
        <>
            <Grid container className="text-xl w-[50vw] flex justify-center bg-transparent text-white mb-4  rounded-2xl items-center p-3">
                <Grid item xs={6}>
                    <div>
                        <h2>{moment().format("MMMM Do YYYY | hh:mm")}</h2>
                        <h1>{city}</h1>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <h2> {nextPrayer}</h2>
                        <h1>{countdown}</h1>
                    </div>
                </Grid>
            </Grid>
            <div className="mb-4" />
            <Stack direction="row"  className="gap-3 content-around">
                <PryerCard
                    title="صلاة الفجر"
                    time={times.Fajr}
                    img="https://i.pinimg.com/236x/6d/89/61/6d896168af1871a9d9998181ab462c42.jpg"
                />
                <PryerCard
                    title="صلاة الضهر"
                    time={times.Dhuhr}
                    img="https://i.pinimg.com/originals/72/9b/bf/729bbf2976ef7e764cbddf27bc16e8e0.jpg"
                />
                <PryerCard
                    title="صلاة العصر"
                    time={times.Asr}
                    img="https://i.pinimg.com/564x/c8/20/c7/c820c79ad49d74f0a491ae5252493a3d.jpg"
                />
                <PryerCard
                    title="صلاة المغرب"
                    time={times.Maghrib}
                    img="https://i.pinimg.com/750x/5f/46/a8/5f46a8c0c92b4d8ed4120c28c0f42e06.jpg"
                />
                <PryerCard
                    title="صلاة العشاء"
                    time={times.Isha}
                    img="https://alhabibshop.com/image/cache/catalog/category/carpet-prayer/carpet-2023/304446-870x870.jpg"
                />
            </Stack>
            <Stack direction="row" className=" mt-2 mb-5 mx-5">
                <div>
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }} size="small" className=" text-white bg-orange-400">
                        <InputLabel id="demo-select-small-label">المدينة</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={city}
                            label="city"
                            className=" text-white"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                            
                            </MenuItem>
                            <MenuItem value={"Qina"}>قنا</MenuItem>
                            <MenuItem value={"Sohag"}>ســوهاج</MenuItem>
                            <MenuItem value={"Assiut"}>اسيوط</MenuItem>
                            <MenuItem value={"Cairo"}>القاهرة</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </Stack>
        </>
    );
}
