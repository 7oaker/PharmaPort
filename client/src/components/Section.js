import { ethers } from 'ethers'

//images
import icon_manufacturer from '../assets/stakeholderIcons/mf.png';
import icon_wholesaler from '../assets/stakeholderIcons/ws.png';
import icon_pharmacy from '../assets/stakeholderIcons/pi.png';


const Section = ({ title, stakeholders, togglePop }) => {
    return (
        <div className='cards__section'>
            <h3 id={title}>{title}</h3>

            <hr />

            <div className='cards'>
                {stakeholders.map((stakeholder, index) => (
                    <div className='card' key={index} onClick={() => togglePop(stakeholder)}>
                        <div className='card__image'>
                            <img src={stakeholder.category === 'manufacturer' ? icon_manufacturer : stakeholder.category === 'wholesaler' ? icon_wholesaler : icon_pharmacy} width="60px" height="60px" alt="Category Icon"
                            />
                        </div>
                        <div className='card__info'>
                            <h4>{stakeholder.name}</h4>
                            <p>ID: {stakeholder.GID}<br></br>TYPE: {stakeholder.category}</p>

                            <strong>Added: {" "}
                                {new Date(Number(stakeholder.regTime.toString() + '000')).toLocaleDateString(
                                    undefined,
                                    {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        second: 'numeric',
                                    })}
                            </strong>
                            <p>Status: {stakeholder.isActive ? 'Active' : 'Inactive'}</p>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Section;