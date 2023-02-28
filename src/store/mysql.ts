import mysql from 'mysql2';

import { CONFIG } from '../config';

const dbConfig = {
    host: '',
    user: '',
    password: '',
    database: ''
}

let connection: mysql.Connection;

function handleCon() {
    connection = mysql.createConnection(dbConfig);

    connection.connect((err) => {
        if (err) {
            console.error('[db err]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected!');
        }
    });

    connection.on('error', (err : any)=> {
        console.error('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    })
}

handleCon();

export function list(table: string) {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

export function get(table: string, id: string) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

export function insert(table: string, data: string) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

export function update(table: string, data: any) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

export function upsert(table: string, data: any) {
    if (data && data.id) {
        return update(table, data);
    } else {
        return insert(table, data);
    }
}

export function query(table: string, query: any[], join: any) {
    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res: any[]) => {
            if (err) return reject(err);
            resolve(res[0] || null);
        })
    })
}