import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { selectAll } from "../heroesFilters/heroesFiltersSlice";
import store from "../../store";

import { useCreateHeroMutation } from "../../api/apiSlice";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const [nameHero, setNameHero] = useState('');
    const [descHero, setDescHero] = useState('');
    const [skillHero, setSkillHero] = useState('');

    const [createHero] = useCreateHeroMutation();

    const {filtersLoadingStatus} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());

    const onCreate = (e) => {
        e.preventDefault();

        const newHero = {
            id: uuidv4(),
            name: nameHero,
            description: descHero,
            element: skillHero,
        };

        createHero(newHero).unwrap();

        setNameHero('');
        setDescHero('');
        setSkillHero('');
    };

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }

        if (filters && filters.length > 0 ) {
            return filters.map(({name, label}) => {
                // eslint-disable-next-line
                if (name === 'all')  return;

                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    return (
        <form
            className="border p-4 shadow-lg rounded"
            onSubmit={onCreate}
        >
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?"
                    onChange={(e) => setNameHero(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    onChange={(e) => setDescHero(e.target.value)}
                    />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    onChange={(e) => setSkillHero(e.target.value)}
                    required
                    className="form-select"
                    id="element"
                    name="element">
                    <option >Я владею элементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button
                type="submit"
                className="btn btn-primary"
            >
                Создать
            </button>
        </form>
    )
}

export default HeroesAddForm;