import { ethers } from 'ethers'
import logo from '../assets/logo.svg';

const Navigation = ({ account, setAccount }) => {
    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0])
        console.log(account)
        setAccount(account);
    }

    return (
        <nav>
            <div className='nav__brand'>
                <img className="nav__logo" src={logo}></img>
                <h1>Pharmaport</h1>
            </div>

            <input
                type="text"
                className="nav__search"
            />

            {account ? (
                <button
                    type="button"
                    className='nav__connect'
                >
                    {account.slice(0, 6) + '...' + account.slice(38, 42)}
                </button>
            ) : (
                <button
                    type="button"
                    className='nav__connect'
                    onClick={connectHandler}
                >
                    Connect
                </button>
            )}

            <ul className='nav__links'>
                <li><a href="#Manufacturer">Verified Stakeholer List</a></li>
                <li><a href="#ProductList">Authorised Pharmaceutical Products</a></li>
                <li><a href="#CompetentAuthorities">Competent Authorities</a></li>
            </ul>
        </nav>
    );
}

export default Navigation;