import { GitHubBanner, Refine } from "@refinedev/core";
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
import { ShowUser } from "./pages/users/show";

import { TwitList } from "./pages/twits/list";
import { TwitCreate } from "./pages/twits/create";
import { TwitEdit } from "./pages/twits/edit";
import { ShowTwit } from "./pages/twits/show";

import { LandingPage } from "./pages/Landing";

// Import the layout component
import { RefineLayout } from "./components/layouts";

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
                                    {/* Landing page without sidebar */}
                                    <Route index element={<LandingPage />} />

                                    {/* Routes with sidebar layout */}
                                    <Route path="/users" element={<RefineLayout><UserList /></RefineLayout>} />
                                    <Route path="/users/create" element={<RefineLayout><UserCreate /></RefineLayout>} />
                                    <Route path="/users/:id/edit" element={<RefineLayout><UserEdit /></RefineLayout>} />
                                    <Route path="/users/:id" element={<RefineLayout><ShowUser /></RefineLayout>} />

                                    <Route path="/twits" element={<RefineLayout><TwitList /></RefineLayout>} />
                                    <Route path="/twits/create" element={<RefineLayout><TwitCreate /></RefineLayout>} />
                                    <Route path="/twits/:id/edit" element={<RefineLayout><TwitEdit /></RefineLayout>} />
                                    <Route path="/twits/:id" element={<RefineLayout><ShowTwit /></RefineLayout>} />
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