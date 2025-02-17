import React, { useState, useEffect } from 'react';
// import { API_URL } from '@env';


const getClassAndSection = () => {
    const [grade, setGrade] = useState([]);
    const [section, setSection] = useState([]);



    const getClasses = async () => {
        try {
            const response = await fetch(`${process.env.API_URL}/attendance/getClass`);
            const result = await response.json();
            if (result.statusCode === 200) {
                setGrade(result.value);
            }
        } catch (error) {
            console.log("Error fetching classes: ", error);
        }
    };

    const getSection = async () => {
        try {
            const response = await fetch(`${process.env.API_URL}/attendance/getSection`);
            const result = await response.json();
            if (result.statusCode === 200) {
                setSection(result.value);
            }
        } catch (error) {
            console.log("Error fetching sections: ", error);
        }
    };

    useEffect(() => {

        getClasses();
        getSection();

    }, []);

    return {
        grade,
        section
    };
};

export default getClassAndSection;
