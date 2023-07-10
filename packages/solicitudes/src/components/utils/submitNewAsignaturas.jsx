const handleCreate = (
  form,
  setForm,
  setInitialValues,
  setAsignaturasList,
  hideModal,
  errors,
  setNoti,
  id,
  tipo,
) => {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;

  const isValid = Object.keys(errors).every((campo) => errors[campo]());
  if (!isValid) {
    setNoti({
      open: true,
      message: 'Algo salio mal, revisa que los campos esten correctos',
      type: 'error',
    });
    return;
  }

  fetch('http://localhost:3000/api/v1/asignaturas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', api_key: apikey },
    body: JSON.stringify(form),
  })
    .then((response) => response.json())
    .then((data) => {
      const newData = { ...form, id: data.data.id };
      setAsignaturasList((prevList) => [...prevList, newData]);
      setForm({ programaId: id, tipo });
      setInitialValues({});
      hideModal();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

export default handleCreate;
