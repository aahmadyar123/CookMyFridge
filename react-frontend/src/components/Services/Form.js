import React, {useState} from 'react';

function Form(props) {
    const [person, setPerson] = useState(
    {
        Food: "",
        Quantity: "",
    });

    function handleChange(event) {
        const {food, value} = event.target;
        if (food === "Quantity")
            setPerson(
            {Food: person['Food'], Quantity: value}
        );

        else 
            setPerson(
                {Food: value, Quantity: person['Quantity']}   
            );
    }

    return (
        <form>
            <label htmlFor="Food">Food</label>

            <input
                type="text"
                name="Food"
                id="Food"
                value={person.Food}
                onChange={handleChange} />

            <label htmlFor="Quantity">Quantity</label>
            
            <input
                type="text"
                name="Quantity"
                id="Quantity"
                value={person.Quantity}
                onChange={handleChange} />
            <input type="button" value="Submit" onClick={submitForm} />
        </form>
    );

    function submitForm() {
        props.handleSubmit(person);
        setPerson({Food: '', Quantity: ''});
    }
}
export default Form;