import { useState } from 'react';
import useLoad from '../../api/useLoad.js';
import { useModal, Modal } from '../../UI/Modal.jsx';
import API from '../../api/API.js';
import { Alert, Confirm, Error } from '../../UI/Notifications.jsx';
import Action from '../../UI/Actions.jsx';
import ModuleForm from './ModuleForm.jsx';
import ModuleList from './ModuleList.jsx';
import ModuleView from './ModuleView.jsx';
import './ModuleCrudler.scss';

function ModuleCrudler({ getModulesEndpoint }) {
  // Initialisation ------------------------------
  const yearsEndpoint = `/years`;
  const staffEndpoint = `/users/staff`;
  const modulesEndpoint = `/modules`;

  // State ---------------------------------------
  const [modules, , loadingMessage, loadModules] = useLoad(getModulesEndpoint);
  const [selectedModule, setSelectedModule] = useState(null);
  const [years, , loadingYearsMessage] = useLoad(yearsEndpoint);
  const [staff, , loadingStaffMessage] = useLoad(staffEndpoint);
  const [showForm, formTitle, openForm, closeForm] = useModal(false);
  const [showAlert, alertContent, openAlert, closeAlert] = useModal(false);
  const [showConfirm, confirmContent, openConfirm, closeConfirm] = useModal(false);
  const [showError, errorContent, openError, closeError] = useModal(false);

  // Handlers ------------------------------------
  const openAddForm = () => {
    handleDismiss();
    openForm('Add new module');
  };

  const openModifyForm = () => {
    openForm('Modify module');
  };

  const openDeleteConfirmation = () =>
    openConfirm(`Are you sure you want to delete module ${selectedModule.ModuleCode}?`);

  const handleSelect = (module) => setSelectedModule(module);
  const handleDismiss = () => setSelectedModule(null);

  const handleAdd = async (module) => {
    const result = await API.post(modulesEndpoint, module);
    checkSuccess(result, 'Module successfully added');
  };

  const handleModify = async (module) => {
    const putEndpoint = `${modulesEndpoint}/${module.ModuleID}`;
    const result = await API.put(putEndpoint, module);
    checkSuccess(result, 'Module successfully modified');
  };

  const handleDelete = async (module) => {
    const deleteEndpoint = `${modulesEndpoint}/${module.ModuleID}`;
    const result = await API.delete(deleteEndpoint);
    checkSuccess(result, 'Module successfully deleted');
  };

  const checkSuccess = async (result, successMessage) => {
    if (result.isSuccess) {
      setSelectedModule(result.result ? result.result[0] : null);
      closeForm();
      openAlert(successMessage);
      await loadModules(getModulesEndpoint);
    } else openError(result.message);
  };

  // View ----------------------------------------
  const dropdowns = {
    years: {
      list: years,
      loadingMessage: loadingYearsMessage,
    },
    staff: {
      list: staff,
      loadingMessage: loadingStaffMessage,
    },
  };
  return (
    <div className='moduleCrudler'>
      <Modal show={showForm} title={formTitle}>
        <ModuleForm
          initialModule={selectedModule}
          onSubmit={selectedModule ? handleModify : handleAdd}
          onCancel={closeForm}
          dropdowns={dropdowns}
        />
      </Modal>

      <Alert show={showAlert} message={alertContent} onDismiss={closeAlert} />
      <Confirm
        show={showConfirm}
        message={confirmContent}
        onConfirm={() => handleDelete(selectedModule)}
        onDismiss={closeConfirm}
      />
      <Error show={showError} message={errorContent} onDismiss={closeError} />

      <Action.Tray>
        <Action.Add showText buttonText={'Add new module'} onClick={openAddForm} />
      </Action.Tray>

      <main>
        {selectedModule && (
          <ModuleView
            module={selectedModule}
            onModify={openModifyForm}
            onDelete={openDeleteConfirmation}
            onDismiss={handleDismiss}
          />
        )}
        <ModuleList modules={modules} loadingMessage={loadingMessage} onSelect={handleSelect} />
      </main>
    </div>
  );
}

export default ModuleCrudler;
