Polaris
========

If this is your first time building MFIX-Exa on Polaris, please 
review the general notes below and `Basics`_ section first.

* The documentation for this system can be found `here. <https://docs.alcf.anl.gov/polaris/getting-started/>`_
* Polaris can be accessed from a system with ssh client installed. These connections also work from NETL's SciLAN and Joule:

  .. code:: bash

   ssh <username>@polaris.alcf.anl.gov

  Login with your Mobilepass token. No need to prefix or append with anything.

* These instructions build MFIX-Exa on the login nodes using `-j8` CPUs. 
  You may have to decrease this value if there is high traffic 
  or you may want to increase this value if you are on a compute 
  node interactively. 
* The cmake instructions compile to a `build` directory. 
  The gmake instructions compile to a `exec` directory. 
* For the dependencies, it is assumed that you have set the 
  following environment variables:

  .. code:: bash

     export HYPRE_INSTALL_DIR=$HOME/<path/to/my/hypre-install-dir>
     export CSG_INSTALL_DIR=$HOME/<path/to/my/csg-dep-install-dir>
     export CSG_LIB_DIR=$HOME/<path/to/my/csg-lib-install-dir>
     export ASCENT_INSTALL_DIR=$HOME/<path/to/my/ascent-install-dir>

  to a path that you have read/write access to, 
  such as inside the ``/lus/grand/projects/<account>/`` space corresponding to your account.
  You will need to recall these paths later if you want to build 
  MFIX-Exa with the optional dependencies. 
* After building the `mfix` executable (with cmake), you can 
  build the PIC-to-DEM restarter app by executing the following command 
  in the `build` directory

  .. code:: bash

      cmake --build . --target pic2dem

Basics
------

Source code
~~~~~~~~~~~
   
Before building, first obtain a copy of the source code
following the instructions on the 
`MFIX-Exa website. <https://mfix.netl.doe.gov/products/mfix-exa/download/>`_

Modules
~~~~~~~

All of the build instructions below have been tested with the 
following modules and environment helpers

.. code:: bash 

   module swap PrgEnv-nvhpc PrgEnv-gnu
   module load cmake/3.23.2


The GPU-enabled builds additionally require

.. code:: bash 

   module load nvhpc-mixed

   export MPICH_GPU_SUPPORT_ENABLED=1
   export AMREX_CUDA_ARCH=8.0

Full builds that utilize external dependencies, also require setting 
certain environment variables as discussed below. 

Building MFIX-Exa
-----------------

The commands below are the superbuild instructions, i.e., 
AMReX is built as part of the MFIX-Exa build process. 
To build MFIX-Exa with hypre, csg and/or ascent dependencies, 
you first need to build and install these libraries and their dependencies.
Instructions on building the necessary dependencies are below 
and should be successfully installed first. There are two primary 
methods of building the code `cmake` and `gmake` which are provided 
seperately below.

cmake
~~~~~

.. tabs::
   
   .. tab:: CPU

      .. code:: bash

         cmake -DCMAKE_C_COMPILER=gcc \
               -DCMAKE_CXX_COMPILER=g++ \
               -DCMAKE_Fortran_COMPILER=gfortran \
               -DMFIX_MPI=yes \
               -DMFIX_OMP=no \
               -DMFIX_GPU_BACKEND=NONE \
               -DAMReX_TINY_PROFILE=no \
               -DMFIX_CSG=no \
               -DMFIX_HYPRE=no \
               -DCMAKE_BUILD_TYPE=Release \
               ../
         make -j8

   .. tab:: GPU

      .. code:: bash

         cmake -DCMAKE_C_COMPILER=gcc \
               -DCMAKE_CXX_COMPILER=g++ \
               -DCMAKE_Fortran_COMPILER=gfortran \
               -DMFIX_MPI=yes \
               -DMFIX_OMP=no \
               -DMFIX_CSG=no \
               -DMFIX_HYPRE=no \
               -DMFIX_GPU_BACKEND=CUDA \
               -DGPUS_PER_NODE=4 \
               -DAMReX_TINY_PROFILE=no \
               -DCMAKE_BUILD_TYPE=Release \
               ../
         make -j8

   .. tab:: CPU-full

      .. code:: bash

         export HYPRE_DIR=$HYPRE_INSTALL_DIR
         export HYPRE_ROOT=$HYPRE_DIR
         export HYPRE_LIBRARIES=$HYPRE_DIR/lib
         export HYPRE_INCLUDE_DIRS=$HYPRE_DIR/include

         export ASCENT_DIR=$ASCENT_INSTALL_DIR
         export CONDUIT_DIR=$ASCENT_DIR
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$ASCENT_DIR/lib/cmake/ascent
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$ASCENT_DIR/lib/cmake/conduit

         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$CSG_INSTALL_DIR

         cmake -DCMAKE_C_COMPILER=gcc \
               -DCMAKE_CXX_COMPILER=g++ \
               -DCMAKE_Fortran_COMPILER=gfortran \
               -DMFIX_MPI=yes \
               -DMFIX_OMP=no \
               -DMFIX_CSG=yes \
               -DMFIX_HYPRE=yes \
               -DAMReX_ASCENT=yes \
               -DAMReX_CONDUIT=yes \
               -DMFIX_GPU_BACKEND=NONE \
               -DAMReX_TINY_PROFILE=no \
               -DCMAKE_BUILD_TYPE=Release \
               ../
         make -j8

   .. tab:: GPU-full

      .. code:: bash

         export HYPRE_DIR=$HYPRE_INSTALL_DIR
         export HYPRE_ROOT=$HYPRE_DIR
         export HYPRE_LIBRARIES=$HYPRE_DIR/lib
         export HYPRE_INCLUDE_DIRS=$HYPRE_DIR/include

         export ASCENT_DIR=$ASCENT_INSTALL_DIR
         export CONDUIT_DIR=$ASCENT_DIR
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$ASCENT_DIR/lib/cmake/ascent
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$ASCENT_DIR/lib/cmake/conduit

         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$CSG_INSTALL_DIR

         cmake -DCMAKE_C_COMPILER=gcc \
               -DCMAKE_CXX_COMPILER=g++ \
               -DCMAKE_Fortran_COMPILER=gfortran \
               -DMFIX_MPI=yes \
               -DMFIX_OMP=no \
               -DMFIX_CSG=yes \
               -DMFIX_HYPRE=yes \
               -DAMReX_ASCENT=yes \
               -DAMReX_CONDUIT=yes \
               -DMFIX_GPU_BACKEND=CUDA \
               -DGPUS_PER_NODE=4 \
               -DAMReX_TINY_PROFILE=no \
               -DCMAKE_BUILD_TYPE=Release \
               ../
         make -j8


Optional build dependencies
---------------------------

The following dependencies need to be built and installed 
prior to following any of the full build instructions above. 

#. Set environment helpers

   .. code:: bash

      export CC=$(which cc)
      export CXX=$(which CC)

      mkdir $HOME/scratch && cd $HOME/scratch 

#. HYPRE

   The GPU build for HYPRE seems to only work with ``cmake``.

   .. tabs::

      .. tab:: CPU

         .. code:: bash

            git clone https://github.com/hypre-space/hypre.git
            pushd hypre/src/
            git checkout v2.26.0
            ./configure --prefix=$HYPRE_INSTALL_DIR --with-MPI
            make -j8 install
            popd

      .. tab:: GPU

         .. code:: bash

            git clone https://github.com/hypre-space/hypre.git
            pushd hypre/src/
            git checkout v2.26.0
            cmake -S . -B build \
                       -DCMAKE_INSTALL_PREFIX=$HYPRE_INSTALL_DIR \
                       -DHYPRE_WITH_DSUPERLU=OFF \
                       -DHYPRE_ENABLE_BIGINT=OFF \
                       -DHYPRE_WITH_OPENMP=OFF \
                       -DHYPRE_ENABLE_SHARED=ON \
                       -DHYPRE_WITH_MPI=ON \
                       -DHYPRE_WITH_CUDA=ON \
                       -DCMAKE_CUDA_ARCHITECTURES=80 \
                       -DHYPRE_ENABLE_CUSPARSE=ON \
                       -DHYPRE_ENABLE_CURAND=ON \
                       -DCMAKE_CXX_COMPILER=$(which nvc++) \
                       -DMPI_CXX_COMPILER=$(which CC) \
                       -DCMAKE_C_COMPILER=$(which nvc) \
                       -DMPI_C_COMPILER=$(which cc) \
                       -DHYPRE_INSTALL_PREFIX=$HYPRE_INSTALL_DIR
            cd build/
            make -j8 install
            popd

#. Catch2

   .. code:: bash

      git clone --depth 1 --branch v2.13.7 https://github.com/catchorg/Catch2
      pushd Catch2/
      cmake -S . -B build -DCMAKE_INSTALL_PREFIX=$CSG_INSTALL_DIR
      cd build/
      make -j8 install
      popd

#. GMP

   .. code:: bash

      wget --no-check-certificate https://ftp.gnu.org/gnu/gmp/gmp-6.2.1.tar.xz
      tar -xf gmp-6.2.1.tar.xz
      pushd gmp-6.2.1
      ./configure --prefix=$CSG_INSTALL_DIR
      make -j8 install
      popd

#. MPFR

   .. code:: bash

      wget --no-check-certificate https://ftp.gnu.org/gnu/mpfr/mpfr-4.1.0.tar.xz
      tar -xf mpfr-4.1.0.tar.xz
      pushd mpfr-4.1.0/
      ./configure --with-gmp=$CSG_INSTALL_DIR --prefix=$CSG_INSTALL_DIR
      make -j8 install
      popd

#. Boost

   .. code:: bash

      wget https://boostorg.jfrog.io/artifactory/main/release/1.81.0/source/boost_1_81_0.tar.gz
      tar -zxvf boost_1_81_0.tar.gz
      pushd boost_1_81_0/
      ./bootstrap.sh
      ./b2 install --prefix=$CSG_INSTALL_DIR
      popd

#. CGAL

   .. code:: bash

      git clone --depth 1 --branch v5.3 https://github.com/CGAL/cgal
      pushd cgal/
      cmake -S . -B build -DCMAKE_INSTALL_PREFIX=$CSG_INSTALL_DIR
      cd build/
      make -j8 install
      popd

#. PEGTL

   .. code:: bash

      git clone --branch 3.2.2 https://github.com/taocpp/PEGTL
      pushd PEGTL/
      cmake -S . -B build -DCMAKE_INSTALL_PREFIX=$CSG_INSTALL_DIR
      cd build/
      make -j8 install
      popd

#. Conduit

   .. code:: bash

      git clone --recursive https://github.com/LLNL/conduit.git
      pushd conduit/
      git checkout v0.8.6
      mkdir build && cd build
      cmake -S ../src -DCMAKE_INSTALL_PREFIX=$ASCENT_INSTALL_DIR \
            -DENABLE_OPENMP=OFF \
            -DENABLE_MPI=ON \
            -DENABLE_CUDA=OFF \
            -DCMAKE_BUILD_TYPE=Release
      make -j8 install
      popd

#. Vtk-m

   .. code:: bash

      git clone --branch master https://gitlab.kitware.com/vtk/vtk-m.git
      pushd vtk-m/
      git checkout v1.9.0
      mkdir build && cd build/
      cmake -S ../ -DCMAKE_INSTALL_PREFIX=$ASCENT_INSTALL_DIR \
            -DVTKm_ENABLE_OPENMP=OFF \
            -DVTKm_ENABLE_MPI=ON \
            -DVTKm_ENABLE_CUDA=OFF \
            -DVTKm_USE_64BIT_IDS=OFF \
            -DVTKm_USE_DOUBLE_PRECISION=ON \
            -DVTKm_USE_DEFAULT_TYPES_FOR_ASCENT=ON \
            -DVTKm_NO_DEPRECATED_VIRTUAL=ON \
            -DCMAKE_BUILD_TYPE=Release
      make -j8 install
      popd

#. Ascent

   .. code:: bash

      git clone --recursive https://github.com/Alpine-DAV/ascent.git
      pushd ascent
      git checkout v0.9.0
      mkdir build && cd build/
      cmake -S ../src -DCMAKE_INSTALL_PREFIX=$ASCENT_INSTALL_DIR \
            -DCONDUIT_DIR=$ASCENT_INSTALL_DIR \
            -DVTKM_DIR=$ASCENT_INSTALL_DIR \
            -DENABLE_VTKH=ON \
            -DENABLE_FORTRAN=OFF \
            -DENABLE_PYTHON=OFF \
            -DENABLE_DOCS=OFF \
            -DBUILD_SHARED_LIBS=ON \
            -DCMAKE_BUILD_TYPE=Release \
            -DENABLE_GTEST=OFF \
            -DENABLE_TESTS=OFF
      make -j8 install
      popd


Running Jobs
------------

Common Slurm commands:

* **qsub runit.sh** submit a job to the queue
* **qstat -u USER** check job status of user USER
* **qdel JOBID** kill a job with id JOBID
* **qsub -I -l select=1:system=polaris -l walltime=0:60:00 -l filesystems=home:gran -q debug -A <ACCOUNT>** grab 1 GPU node (for up to 1 hrs)

Example run scripts:

Example run script for GPU is below. For CPU-only, 
remove ``module load nvhpc-mixed`` and ``export MPICH_GPU_SUPPORT_ENABLED=1``, 
and the options ``ppn`` and ``--cpu-bind core`` from the run line.

.. code:: bash

   #!/bin/bash
   #PBS -A <ACCOUNT>
   #PBS -q prod
   #PBS -l select=64:system=polaris
   #PBS -l filesystems=home:eagle
   #PBS -l walltime=04:00:00
   #PBS -N alcc_tk1
   #PBS -k doe
   #PBS -o stdout
   #PBS -e stderr
   #PBS -m be
   ##PBS -M <email addresses>    # Be default, mail goes to the submitter, use this option to add others (uncomment to use)

   NNODES=`wc -l < $PBS_NODEFILE`       # number of nodes requested
   RPN=4                                # assume 1 GPU = 1 resource, 4 GPUs / node
   RES=$((NNODES*RPN))                  # total number of resources

   echo 'procs = '$procs' '
   echo '$PBS_O_WORKDIR = '$PBS_O_WORKDIR' '
   cd $PBS_O_WORKDIR

   module swap PrgEnv-nvhpc PrgEnv-gnu
   module load nvhpc-mixed

   export MPICH_GPU_SUPPORT_ENABLED=1

   set +x                               # report all commands to stderr
   env                                  # save the env

   mpiexec -n $RES -ppn $RPN --cpu-bind core ./mfix inputs > screen.1
   wait 3
   mpiexec -n $RES -ppn $RPN --cpu-bind core ./mfix inputs > screen.2
   wait 7
   mpiexec -n $RES -ppn $RPN --cpu-bind core ./mfix inputs > screen.3

   echo 'eof EOF EOR eor'
