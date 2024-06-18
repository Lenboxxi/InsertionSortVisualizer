"use client";
import {Box} from "@mui/system";
import {Button, Card, Modal, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {BarChart} from "@mui/x-charts";

export default function Home() {
    const [open, setOpen] = React.useState(false);
    const [array, setArray] = useState<number[]>([]);
    const [stringArray, setStringArray] = useState<string>("");
    const [insertionSortArray, setInsertionSortArray] = useState<number[]>([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100vw',
                bottom: 24,
            }}
        >
            <TextField id="input_array" label="Input" variant="outlined" sx={{width: '60vw'}} value={stringArray}
                       onKeyDown={handleKeyDown} onChange={handleInputChange}/>
            <Box sx={{display: 'flex', flexDirection: 'row', width: '60vw', justifyContent: 'space-between'}}>
                <Button variant="outlined" sx={{width: "25vw", marginY: 2}} onClick={handleArraySubmit}>Submit</Button>
                <Button variant="contained" sx={{width: "25vw", marginY: 2}} onClick={randomArray}>Random</Button>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '60vw', textAlign: 'center'}}>
                <Card variant="outlined" sx={{width: "29vw", padding: "5px"}}>
                    <h2>Insertion Sort</h2>
                    <BarChart series={[{data: insertionSortArray}]} height={300}/>
                    <Button variant="contained" onClick={handleOpen}>History</Button>
                </Card>
                <Card variant="outlined" sx={{width: "29vw", padding: "5px"}}>
                    <h2>Insertion Sort</h2>
                    <BarChart series={[{data: insertionSortArray}]} height={300}/>
                    <Button variant="contained" onClick={handleOpen}>History</Button>
                </Card>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '1rem', backgroundColor: 'white', borderRadius: '15px'}}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        History
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                    <Button variant="contained" onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
        </Box>
    );

    function handleKeyDown(event: any) {
        if (event.key === "Enter") {
            handleArraySubmit();
        }
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setStringArray(event.target.value);
    }

    function handleArraySubmit() {
        let newArray = stringArray.split(",").map(Number).filter(n => !isNaN(n));
        setArray(newArray);
        insertionSort(newArray).then(() => {
            console.log("Insertion sort complete")
        });
    }

    function randomArray() {
        const array = [];
        for (let i = 0; i < 10; i++) {
            array.push(Math.floor(Math.random() * 100))
        }
        setStringArray(array.join(", "));
    }

    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function insertionSort(arr: number[]) {
        let x = [...arr];
        let n = x.length;
        for (let i = 1; i < n; i++) {
            let key = x[i];
            let j = i - 1;
            while (j >= 0 && x[j] > key) {
                x[j + 1] = x[j];
                j = j - 1;
                setInsertionSortArray([...x]);
                await sleep(500); // Adjust the delay (in milliseconds) as needed
            }
            x[j + 1] = key;
            setInsertionSortArray([...x]);
            await sleep(500); // Adjust the delay (in milliseconds) as needed
        }
        setInsertionSortArray([...x]);
    }
}
