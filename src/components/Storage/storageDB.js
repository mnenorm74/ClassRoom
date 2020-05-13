import React from "react";

const StorageElements = [
    {
        type: "folder", name: "1 семестр", owner: "Наталья Рогачева", date: "08.04.2020", semester: "1",
        content: [{type: "file", name: "1.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "4"},
            {type: "file", name: "2.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "4"},
            {type: "file", name: "3.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "4"},
            {
                type: "folder", name: "папка", owner: "Наталья Рогачева", date: "08.04.2020", semester: "4",
                content: [{type: "file", name: "3.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "4"},
                    {type: "file", name: "4.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "4"},]
            },]
    },
    {type: "folder", name: "2 семестр", owner: "Наталья Рогачева", date: "08.04.2020", semester: "2"},
    {type: "folder", name: "3 семестр", owner: "Наталья Рогачева", date: "08.04.2020", semester: "3"},
    {type: "file", name: "1.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "4"},
    {type: "file", name: "2.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "4"},
    {type: "file", name: "3.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "4"},
    {type: "file", name: "4.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "4"},
    {type: "folder", name: "1 семестр", owner: "Наталья Рогачева", date: "08.04.2020", semester: "5"},
    {type: "folder", name: "2 семестр", owner: "Наталья Рогачева", date: "08.04.2020", semester: "4"},
    {type: "folder", name: "3 семестр", owner: "Наталья Рогачева", date: "08.04.2020", semester: "3"},
    {type: "file", name: "1.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "4"},
    {type: "file", name: "2.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "4"},
    {type: "file", name: "3.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "5"},
    {type: "file", name: "4.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "6"},
    {type: "file", name: "1.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "6"},
    {type: "file", name: "2.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "6"},
    {type: "file", name: "3.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "6"},
    {type: "file", name: "4.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "6"},
    {type: "folder", name: "1 семестр", owner: "Наталья Рогачева", date: "08.04.2020", semester: "1"},
    {type: "folder", name: "2 семестр", owner: "Наталья Рогачева", date: "08.04.2020", semester: "2"},
    {type: "folder", name: "3 семестр", owner: "Наталья Рогачева", date: "08.04.2020", semester: "3"},
    {type: "file", name: "1.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "4"},
    {type: "file", name: "2.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "4"},
    {type: "file", name: "3.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "4"},
    {type: "file", name: "4.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "4"},
    {type: "folder", name: "1 семестр", owner: "Наталья Рогачева", date: "08.04.2020", semester: "5"},
    {type: "folder", name: "2 семестр", owner: "Наталья Рогачева", date: "08.04.2020", semester: "4"},
    {type: "folder", name: "3 семестр", owner: "Наталья Рогачева", date: "08.04.2020", semester: "3"},
    {type: "file", name: "1.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "4"},
    {type: "file", name: "2.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "4"},
    {type: "file", name: "3.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "5"},
    {type: "file", name: "4.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "6"},
    {type: "file", name: "1.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "6"},
    {type: "file", name: "2.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "6"},
    {type: "file", name: "3.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "6"},
    {type: "file", name: "4.docx", owner: "Наталья Рогачева", date: "08.04.2020", semester: "6"}
]

export default StorageElements