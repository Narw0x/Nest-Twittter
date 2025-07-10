import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
    DocumentTitleHandler,
    UnsavedChangesNotifier,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp } from "antd";
import { BrowserRouter, Route, Routes } from "react-router";
import { ColorModeContextProvider } from "./contexts/color-mode";

// Import your page components
import { UserList } from "./pages/users/list";
import { UserCreate } from "./pages/users/create";
import { UserEdit } from "./pages/users/edit";

import { TwitList } from "./pages/twits/list";
import { TwitCreate } from "./pages/twits/create";
import { TwitEdit } from "./pages/twits/edit";

function App() {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <RefineKbarProvider>
                <ColorModeContextProvider>
                    <AntdApp>
                        <DevtoolsProvider>
                            <Refine
                                dataProvider={dataProvider("http://localhost:4000/admin")}
                                notificationProvider={useNotificationProvider}
                                routerProvider={routerBindings}
                                resources={[
                                    {
                                        name: "twits",
                                        list: "/twits",
                                        create: "/twits/create",
                                        edit: "/twits/:id/edit",
                                        show: "/twits/:id",
                                        meta: {
                                            canDelete: true,
                                        },
                                    },
                                    {
                                        name: "users",
                                        list: "/users",
                                        create: "/users/create",
                                        edit: "/users/:id/edit",
                                        show: "/users/:id",
                                        meta: {
                                            canDelete: true,
                                        },
                                    },
                                ]}
                                options={{
                                    syncWithLocation: true,
                                    warnWhenUnsavedChanges: true,
                                    useNewQueryKeys: true,
                                    projectId: "MjT1zV-9tGkbA-lywSD3",
                                }}
                            >
                                <Routes>
                                    <Route index element={<WelcomePage />} />

                                    {/* User routes */}
                                    <Route path="/users" element={<UserList />} />
                                    <Route path="/users/create" element={<UserCreate />} />
                                    <Route path="/users/:id/edit" element={<UserEdit />} />

                                    {/* Twit routes */}
                                    <Route path="/twits" element={<TwitList />} />
                                    <Route path="/twits/create" element={<TwitCreate />} />
                                    <Route path="/twits/:id/edit" element={<TwitEdit />} />
                                </Routes>
                                <RefineKbar />
                                <UnsavedChangesNotifier />
                                <DocumentTitleHandler />
                            </Refine>
                            <DevtoolsPanel />
                        </DevtoolsProvider>
                    </AntdApp>
                </ColorModeContextProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;