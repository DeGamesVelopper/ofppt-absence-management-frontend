import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import CreateModal from "../Modals/PopUpModal";
import UpdateModal from "../Modals/PopUpModal";
import ConfirmModal from "../Modals/ConfirmDeletionModal";
import SearchInput from "../Controls/CustomInput";
import Table from "../Controls/Table";

import {
  fetchFilieres,
  getFilieres,
  editFiliere,
  deleteFiliere,
  addFiliere,
  getNextRows,
  getPrevRows,
  FilterFilieres,
} from "../../store/actions/filiereActions";

import PageLoading from "../Controls/Loading/pageLoading";
import { AddIcon } from "../../Icons";

import "./filiere.css";

const Filiere = () => {
  const [searchInput, setSearchInput] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [updateAbvname, setUpdateAbvname] = useState("");
  const [IdToUpdate, setIdToUpdate] = useState("");
  const [updateFiliereName, setUpdateFiliereName] = useState("");

  const [ID, setID] = useState("");
  const [newAbvname, setNewAbvname] = useState("");
  const [newFiliere, setNewFiliere] = useState("");

  const [filieres, setFilieres] = useState([]);

  //redux states
  const isloading = useSelector(state => state.flrStore.isloading);
  const Filieres = useSelector(state => state.flrStore.filieres);
  const onCRUDAction = useSelector(state => state.flrStore.onCRUDAction);
  const islogin = useSelector(state => state.auth.islogin);
  const COLLECTION_LENGTH = useSelector(state => state.flrStore.length);
  const firstIndex = useSelector(state => state.flrStore.firstIndex);
  const lastIndex = useSelector(state => state.flrStore.lastIndex);
  const dispatch = useDispatch();

  useEffect(() => {
    if (islogin && Filieres?.length === 0) {
      const fetchData = async () => {
        await dispatch(fetchFilieres());
        await dispatch(getFilieres({ firstIndex, lastIndex }));
        setFilieres(Filieres);
      };
      fetchData();
    }
  }, []);

  useEffect(() => {
    dispatch(getFilieres({ firstIndex, lastIndex }));
  }, [dispatch, firstIndex, lastIndex]);

  useEffect(() => {
    setFilieres(Filieres);
  }, [Filieres]);

  const getNext10Row = () => {
    dispatch(getNextRows({ firstIndex, lastIndex, COLLECTION_LENGTH }));
  };

  const getPrev10Row = () => {
    dispatch(getPrevRows({ firstIndex, lastIndex }));
  };

  const filter = () => {
    dispatch(
      FilterFilieres({ firstIndex, lastIndex, filtertext: searchInput })
    );
  };

  const handleEdit = () => {
    setSearchInput("");
    const data = {
      id: IdToUpdate,
      abvname: updateAbvname,
      name: updateFiliereName,
    };
    dispatch(editFiliere({ data, firstIndex, lastIndex }));
    return true;
  };

  const handleDelete = id => {
    setSearchInput("");
    dispatch(deleteFiliere({ id, firstIndex, lastIndex }));
  };

  const handleAdd = () => {
    if (newAbvname && newFiliere) {
      const data = {
        abvname: newAbvname,
        name: newFiliere,
      };
      dispatch(addFiliere({ data, firstIndex, lastIndex }));
      return true;
    } else return false;
  };

  const OpenUpdateModal = id => {
    const flr = Filieres.find(filiere => filiere._id === id);
    const { _id, abvname, name } = flr;
    setIdToUpdate(_id);
    setUpdateAbvname(abvname);
    setUpdateFiliereName(name);
  };

  const CloseModal = () => {
    setShowCreateModal(false);
    setIdToUpdate("");
    setUpdateAbvname("");
    setUpdateFiliereName("");
    setNewFiliere("");
    setNewAbvname("");
  };

  return (
    <>
      {!islogin ? (
        <Redirect to="/login" />
      ) : /* create */
      showCreateModal ? (
        <CreateModal
          customizeInput="createModal__Input"
          title="Nouveau Filière"
          inputs={[
            {
              keyValue: 1,
              placeholder: "Abreviation",
              value: newAbvname,
              setValue: setNewAbvname,
            },
            {
              keyValue: 2,
              placeholder: "Filiere",
              value: newFiliere,
              setValue: setNewFiliere,
            },
          ]}
          sumbitButton="Ajouter"
          cancelButton="Annuler"
          DoAction={() => handleAdd()}
          close={() => CloseModal()}
        />
      ) : null}
      {
        // update Modal
        updateAbvname && updateFiliereName ? (
          <UpdateModal
            customizeInput="createModal__Input"
            title="Modification du filière"
            inputs={[
              {
                keyValue: 1,
                placeholder: "Abreviation",
                value: updateAbvname,
                setValue: setUpdateAbvname,
              },
              {
                keyValue: 2,
                placeholder: "Filiere",
                value: updateFiliereName,
                setValue: setUpdateFiliereName,
              },
            ]}
            sumbitButton="Changer"
            cancelButton="Annuler"
            DoAction={() => handleEdit()}
            close={() => CloseModal()}
          />
        ) : null
      }
      {
        /* delete */
        ID ? (
          <ConfirmModal
            text="Voulez-vous vraiment supprimer ce filiere?"
            Delete={() => handleDelete(ID)}
            close={() => setID("")}
          />
        ) : null
      }
      {isloading ? <PageLoading className="filieres__loading" /> : null}
      <div className="filieres__content">
        {/* search and add new */}
        <div className="filieres__search__add">
          {/* add */}
          <AddIcon
            onClick={() => setShowCreateModal(true)}
            className="Icon filieres__content__addIcon"
          />
          {/* custom input */}
          <SearchInput
            className="filieres__Input"
            value={searchInput}
            setValue={setSearchInput}
            placeholder="Recherche du filiere"
            search={true}
            filter={filter}
          />
        </div>

        {/* table */}
        <Table
          collection={filieres}
          onCRUDAction={onCRUDAction}
          headers={["Abréviation", "Filiere"]}
          OpenDeleteModal={setID}
          OpenUpdateModal={OpenUpdateModal}
          COLLECTION_LENGTH={COLLECTION_LENGTH}
          currentIndex={{ firstIndex, lastIndex }}
          Next={() => getNext10Row()}
          Previous={() => getPrev10Row()}
        />
      </div>
    </>
  );
};

export default Filiere;
