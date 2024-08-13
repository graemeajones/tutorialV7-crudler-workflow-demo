import './ModuleList.scss';

function ModuleList({ modules, loadingMessage, onSelect }) {
  // Initialisation ------------------------------
  // State ---------------------------------------
  // Handlers ------------------------------------
  // View ----------------------------------------
  if (!modules) return <ModuleListMessage message={loadingMessage} />;
  if (modules.length === 0) return <ModuleListMessage message='No records found!' />;

  return (
    <div className='moduleList'>
      {modules.map((module) => (
        <ModuleListItem key={module.ModuleID} module={module} onSelect={onSelect} />
      ))}
    </div>
  );
}

function ModuleListMessage({ message }) {
  // Initialisation ------------------------------
  // State ---------------------------------------
  // Handlers ------------------------------------
  // View ----------------------------------------
  return <p className='moduleListMessage'>{message}</p>;
}

function ModuleListItem({ module, onSelect }) {
  // Initialisation ------------------------------
  // State ---------------------------------------
  // Handlers ------------------------------------
  const handleSelect = () => onSelect(module);

  // View ----------------------------------------
  const moduleLeader = module.ModuleLeaderID
    ? `${module.ModuleLeaderName} (Module Leader)`
    : 'Module leader not assigned';

  const moduleLeaderClass = `moduleListLeader ${!module.ModuleLeaderID && 'moduleListNoLeader'}`;

  return (
    <div className='moduleListItem' onClick={handleSelect}>
      <div className='moduleListImage'>
        <img src={module.ModuleImageURL} alt={`Visual description of module`} />
      </div>
      <div className='moduleListDetails'>
        <p className='moduleListTitle'>{`${module.ModuleCode} ${module.ModuleName}`}</p>
        <p className={moduleLeaderClass}>{moduleLeader}</p>
      </div>
    </div>
  );
}

export default ModuleList;
