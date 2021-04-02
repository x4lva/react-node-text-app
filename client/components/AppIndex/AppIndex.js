import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/client";

function AppIndex(props) {
    return (
        <div className="mt-1 container-fluid d-flex justify-content-center align-items-center flex-column">
            <nav className="col-9 navbar navbar-expand-lg">
                <div className="container-fluid d-flex justify-content-between">
                    <a className="navbar-brand text-light fw-bolder" href="#">
                        NextNote
                    </a>
                    <div id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link href="/signin?callbackUrl=http://localhost:3000/">
                                    <button className="btn btn-outline-light">
                                        Sign in
                                    </button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <section className="info">
                <div className="app-index-info d-flex justify-content-center flex-column">
                    <h1 className="text-center text-white">
                        The simplest way to keep notes
                    </h1>
                    <p className="text-center text-secondary">
                        All your notes, synced on all your devices.
                        <br /> Get NextNote now for iOS, Android, Mac, Windows,
                        Linux, or in your browser.
                    </p>
                </div>
            </section>
            <section className="features">
                <div className="col-8 d-flex justify-content-center">
                    <div className="features-list d-flex flex-wrap justify-content-between">
                        <div className="features-list-item">
                            <div className="features-item-header">
                                <div className="features-item-header-icon">
                                    <i className="fas fa-cloud"></i>
                                </div>
                                Use it everywhere
                            </div>
                            <div className="features-item-description">
                                Notes stay updated across all your devices,
                                automatically and in real time. There’s no
                                “sync” button: It just works.
                            </div>
                        </div>
                        <div className="features-list-item">
                            <div className="features-item-header">
                                <div className="features-item-header-icon">
                                    <i className="fas fa-tags"></i>
                                </div>
                                Stay organized
                            </div>
                            <div className="features-item-description">
                                Add tags to find notes quickly with instant
                                searching.
                            </div>
                        </div>
                        <div className="features-list-item">
                            <div className="features-item-header">
                                <div className="features-item-header-icon">
                                    <i className="fas fa-user-friends"></i>
                                </div>
                                Work together
                            </div>
                            <div className="features-item-description">
                                Share a to-do list, post some instructions, or
                                publish your notes online.
                            </div>
                        </div>
                        <div className="features-list-item">
                            <div className="features-item-header">
                                <div className="features-item-header-icon">
                                    <i className="fas fa-history"></i>
                                </div>
                                Go back in time
                            </div>
                            <div className="features-item-description">
                                Notes are backed up with every change, so you
                                can see what you noted last week or last month.
                            </div>
                        </div>
                        <div className="features-list-item">
                            <div className="features-item-header">
                                <div className="features-item-header-icon">
                                    <i className="fas fa-heading"></i>
                                </div>
                                Markdown support
                            </div>
                            <div className="features-item-description">
                                Write, preview, and publish your notes in
                                Markdown format.
                            </div>
                        </div>
                        <div className="features-list-item">
                            <div className="features-item-header">
                                <div className="features-item-header-icon">
                                    <i className="fas fa-info-circle"></i>
                                </div>
                                It’s free
                            </div>
                            <div className="features-item-description">
                                Apps, backups, syncing, sharing – it’s all
                                completely free.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AppIndex;
