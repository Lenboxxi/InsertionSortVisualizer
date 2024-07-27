"use client";
import {Box} from "@mui/system";
import {Card, TextField} from "@mui/material";
import React, {useState} from "react";
import {LineChart} from "@mui/x-charts";
import {Button} from "@mui/joy";
import randomArray from "@/app/utils/randomArray";
import "@/app/css/main.css";

export default function Home() {
    const [stringArray, setStringArray] = useState<string>("");
    const [insertionSortArray, setInsertionSortArray] = useState<number[]>([]);
    const [insertionSortColor, setInsertionSortColor] = useState<string>("grey");
    const [sorting, setSorting] = useState<boolean>(false);
    const [delay, setDelay] = useState<number>(50);

    const numbersSymbols = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ",", " "];

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
            <Box sx={{display: 'flex', flexDirection: 'row', width: '60vw', justifyContent: 'space-between'}}>
                <Button variant="outlined" sx={{width: "25vw", marginY: 2}} onClick={handleArraySubmit}
                        disabled={sorting}>Submit</Button>
                <Button sx={{width: "25vw", marginY: 2}} onClick={() => {
                    setStringArray(randomArray)
                }}>Random</Button>
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
