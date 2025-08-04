import { Button } from 'primereact/button';
import WelcomeCard from '../components/WelcomeCard';

const HomePage = () => {
  return (
    <div className="p-4 space-y-4">
      <WelcomeCard />

      <Button 
        label="Explore Features"
        icon="pi pi-search"
        className="p-button-rounded p-button-info"
      />
    </div>
  );
};

export default HomePage;
