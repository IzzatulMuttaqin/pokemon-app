import React from 'react';

const PokemonCard = (props) => {
    return (
        <>
            <div
                style={{
                    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.2)',
                    transition: '0.3s',
                    borderRadius: '10px',
                    width: '100px',
                    paddingBottom: '10px',
                }}
            >
                <div className="image"
                    onClick={props.pushDetail}
                    style={{ height: '100px', cursor: 'pointer' }}
                >
                    <img src={props.imageUrl} height={'100px'} />
                </div>
                <div
                    onClick={props.pushDetail}
                    style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: '90%',
                        marginLeft: '5%',
                        marginRight: '5%',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {props.name}
                </div>
                {!!props.remove &&
                    <div
                        onClick={props.remove}
                        style={{
                            backgroundColor: 'red',
                            width: '70px',
                            marginTop: '5px',
                            fontWeight: 'bold',
                            padding: '2px 5px',
                            border: 'none',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            textAlign: 'center',
                            cursor: 'pointer',
                            borderRadius: '10px',
                            color: 'white',
                        }}
                    >
                        RELEASE
                  </div>
                }
            </div>
        </>
    )
}

export default PokemonCard;