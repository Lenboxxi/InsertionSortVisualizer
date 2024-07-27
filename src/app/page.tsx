"use client";
import {Box} from "@mui/system";
import {Card, TextField} from "@mui/material";
import React, {useState} from "react";
import {LineChart} from "@mui/x-charts";
import {Button, Slider} from "@mui/joy";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import "@/app/css/main.css";

export default function Home() {
    const [stringArray, setStringArray] = useState<string>("9,8,7,6,5,4,3,2,1,0");
    const [insertionSortArray, setInsertionSortArray] = useState<number[]>([]);
    const [insertionSortColor, setInsertionSortColor] = useState<string>("grey");
    const [sorting, setSorting] = useState<boolean>(false);
    const [delay, setDelay] = useState<number>(50);
    const [items, setItems] = useState<number>(50);

    const numbersSymbols = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ",", " "];

    const handleChangeDelay = (event: Event, newValue: number | number[]) => {
        setDelay(newValue as number);
    };
    const handleChangeItems = (event: Event, newValue: number | number[]) => {
        setItems(newValue as number);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100vw',
                bottom: 24,
                marginTop: 10
            }}
        >
            <TextField id="input_array" label="Input" variant="outlined" sx={{width: '60vw'}} value={stringArray}
                       onKeyDown={handleKeyDown} onChange={handleInputChange} disabled={sorting}/>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '60vw',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Box sx={{display: 'flex', alignItems: 'right', flexDirection: 'column'}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Slider aria-label="Volume" value={items} onChange={handleChangeItems} size={"sm"}
                                valueLabelDisplay="auto" sx={{width: 120, marginRight: 5}} disabled={sorting}/>
                        Items: {items}
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Slider aria-label="Volume" value={delay} onChange={handleChangeDelay} size={"sm"}
                                valueLabelDisplay="auto" sx={{width: 120, marginRight: 5}} min={10} max={1000} disabled={sorting}/>
                        Delay: {delay}ms
                    </Box>
                </Box>
                <Box>
                    <Button variant="outlined" sx={{marginY: 2, marginX: 1}} onClick={() => {
                        setStringArray(randomArray)
                    }} disabled={sorting}><ShuffleIcon/></Button>
                    <Button sx={{marginY: 2}} onClick={handleArraySubmit}
                            disabled={sorting}><PlayCircleOutlineIcon/></Button>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '60vw',
                textAlign: 'center'
            }}>
                <Card variant="outlined" sx={{width: "60vw", padding: "5px"}}>
                    <h2>Insertion Sort</h2>
                    <LineChart series={[{data: insertionSortArray, color: insertionSortColor}]} height={300}
                               grid={{vertical: true, horizontal: true}}/>
                </Card>
            </Box>
        </Box>
    );

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setStringArray(event.target.value);
    }

    function handleArraySubmit() {
        if (!sorting) {
            setSorting(true);
            let newArray = stringArray.split(",").map(Number).filter(n => !isNaN(n));
            setInsertionSortColor("grey");
            insertionSort(newArray).then(() => {
                console.log("Insertion sort complete")
            });
        }
    }

    function handleKeyDown(event: any) {
        if (!numbersSymbols.includes(event.key) && (event.key !== "Enter") && (event.key !== "Backspace")) {
            event.preventDefault();
        }
        if (event.key === "Enter") {
            handleArraySubmit();
        } else {
            if (!numbersSymbols.includes(event.key) && (event.key !== "Backspace")) {
                event.preventDefault();
            }
        }
    }

    function randomArray() {
        const array = [];
        for (let i = 0; i < items; i++) {
            array.push(Math.floor(Math.random() * 1000))
        }
        return array.join(", ");
    }

    function getDelay() {
        return delay;
    }

    function sleep() {
        return new Promise(resolve => setTimeout(resolve, getDelay()));
    }

    async function insertionSort(arr: number[]) {
        const steps: number[][] = [];
        let x = [...arr];
        let n = x.length;
        for (let i = 1; i < n; i++) {
            let key = x[i];
            let j = i - 1;
            while (j >= 0 && x[j] > key) {
                x[j + 1] = x[j];
                j = j - 1;
                setInsertionSortArray([...x]);
                steps.push([...x]);
                await sleep(); // Adjust the delay (in milliseconds) as needed
            }
            x[j + 1] = key;
            setInsertionSortArray([...x]);
            steps.push([...x]);
            await sleep(); // Adjust the delay (in milliseconds) as needed
        }
        setInsertionSortArray([...x]);
        setInsertionSortColor("green");
        setSorting(false);
    }
}
