// Sam Meech-Ward on YT

import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getNotes() {
    const [rows] = await pool.query("SELECT * FROM notes")  // destructuring
    // const rows = result[0]
    return rows 
}

export async function getNote(id) {
    const [row] = await pool.query(`
        SELECT * 
        FROM notes 
        WHERE id = ?
    `, [id])
    return row[0]
}

export async function createNote(title, contents) {
    const [result] = await pool.query(`
        INSERT INTO notes (title, contents) 
        VALUES (?, ?)
    `, [title, contents])
    const id = result.insertId
    return getNote(id)
}

// const note = await getNote(1)
// console.log(note)

// const result = await createNote('test', 'test')
// console.log(result)
