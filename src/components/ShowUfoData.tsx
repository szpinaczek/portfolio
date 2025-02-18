"use client";

import { memo, useEffect, useState } from "react";
import styles from "@/components/Earth.module.scss";
import { LetterFx } from "@/once-ui/components";
import RandomizeAlienText from "./RandomizeAlienText";

const codePoints: number[] = [
    0x1401, 0x1402, 0x1403, 0x1404, 0x1405, 0x1406, 0x1407, 0x1408, 0x1409,
    0x140a, 0x140b, 0x140c, 0x140d, 0x140e, 0x140f, 0x1450, 0x1451, 0x1452,
    0x1453, 0x1454, 0x1455, 0x1456, 0x1457, 0x1458, 0x1459, 0x142b, 0x142c,
    0x142d, 0x142e, 0x142f, 0x1410, 0x1441, 0x1442, 0x1443, 0x1444, 0x1445,
    0x1446, 0x1447, 0x1448,
];

const ShowUfoData = ({ data }) => {

    // const toTitleCase = (str: string) => {
    //     return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
    // }

    const text = `Mind Scan (corrupted)

    ${data}`


    return <>
        <section className={styles.scanInfo}>
            <div className={styles.multiline}>
                <RandomizeAlienText text={text} />
            </div>
        </section>
    </>
}

export default memo(ShowUfoData)