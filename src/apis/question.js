const getQuestions = async () => {
    let response = await fetch("./moduleInfo.json");
    let data = await response.json();

    return data;
};

export default getQuestions;