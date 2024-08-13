import RecordView from '../../UI/RecordView.jsx';
import Action from '../../UI/Actions.jsx';
import './ModuleView.scss';

function ModuleView({ module, onModify, onDelete, onDismiss }) {
  // Initialisation ------------------------------
  const labels = {
    ModuleName: 'Module name',
    ModuleCode: 'Module code',
    ModuleLevel: 'Module level',
    ModuleImageURL: 'Image URL',
    ModuleLeaderName: 'Module leader',
    ModuleYearName: 'Year cohort',
  };

  // State ---------------------------------------
  // Handlers ------------------------------------
  // View ----------------------------------------
  return (
    <div className='moduleView'>
      <h3>{`${module.ModuleCode} ${module.ModuleName}`}</h3>
      <RecordView record={module} labels={labels} />
      <Action.Tray>
        <Action.Modify showText buttonText={'Modify'} onClick={onModify} />
        <Action.Delete showText buttonText={'Delete'} onClick={onDelete} />
        <Action.Dismiss showText buttonText={'Dismiss'} onClick={onDismiss} />
      </Action.Tray>
    </div>
  );
}

export default ModuleView;
