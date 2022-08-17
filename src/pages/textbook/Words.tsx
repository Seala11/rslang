import React, { useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'src/store/hooks';
import { fetchCurrentPageWords } from 'src/store/wordsSlice';

const Words = () => {
  const navigate = useNavigate();
  const selectElement = useRef(null);
  const dispatch = useAppDispatch();

  const selectChangeHandler = () => {
    if (!selectElement.current) return;

    const group = (selectElement.current as HTMLSelectElement).value;

    navigate(group);

    dispatch(fetchCurrentPageWords(+group, 1));
  };

  return (
    <>
      <select name='groups' ref={selectElement} onChange={selectChangeHandler}>
        <option value='0'>group 1</option>
        <option value='1'>group 2</option>
        <option value='2'>group 3</option>
        <option value='3'>group 4</option>
        <option value='4'>group 5</option>
        <option value='5'>group 6</option>
      </select>

      <Outlet />
    </>
  );
};

export default Words;
