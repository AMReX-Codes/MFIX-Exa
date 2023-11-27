Perlmutter
===========

If this is your first time building MFIX-Exa on Perlmutter, please 
review the general notes below and `Basics`_ section first.

* The documentation for this system can be found `here. <https://docs.nersc.gov/systems/perlmutter/>`_
* Perlmutter can be accessed from a system with ssh client installed. These connections also work from NETL's SciLAN and Joule:

  .. code:: bash

   ssh <username>@perlmutter-p1.nersc.gov
   ssh <username>@saul-p1.nersc.gov

  Login with your Iris password + (Google) Aunthenticator passcode.

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
  such as inside the `$SCRATCH` space corresponding to your account.
  You will need to recall these paths later if you want to build 
  MFIX-Exa with the optional dependencies. 
* After building the `mfix` executable (with cmake), you can 
  build the PIC-to-DEM restarter app by executing the following command 
  in the `build` directory

  .. code:: bash

      cmake --build . --target pic2dem

.. warning::
   
   Currently, the ``cmake GPU build`` with hypre support links but does not run. We are still investigating, but recommend using ``gmake`` on Perlmutter at this time.


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

    module load PrgEnv-gnu/8.3.3
    module load cmake/3.22.0

    export CC=cc
    export CXX=CC
    export FC=ftn

The GPU-enabled builds additionally require

.. code:: bash 

    module load cudatoolkit/11.5

    export CUDACXX=$(which nvcc)
    export CUDAHOSTCXX=CC

    export MPICH_GPU_SUPPORT_ENABLED=1
    export CRAY_ACCEL_TARGET=nvidia80

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

         cmake -DMFIX_MPI=yes \
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

         cmake -DMFIX_MPI=yes \
               -DMFIX_OMP=no \
               -DMFIX_CSG=no \
               -DMFIX_HYPRE=no \
               -DMFIX_GPU_BACKEND=CUDA \
               -DAMReX_CUDA_ARCH=8.0 \
               -DGPUS_PER_SOCKET=4 \
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

         cmake -DMFIX_MPI=yes \
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

         cmake -DMFIX_MPI=yes \
               -DMFIX_OMP=no \
               -DMFIX_CSG=yes \
               -DMFIX_HYPRE=yes \
               -DAMReX_ASCENT=yes \
               -DAMReX_CONDUIT=yes \
               -DMFIX_GPU_BACKEND=CUDA \
               -DAMReX_CUDA_ARCH=8.0 \
               -DGPUS_PER_SOCKET=4 \
               -DGPUS_PER_NODE=4 \
               -DAMReX_TINY_PROFILE=no \
               -DCMAKE_BUILD_TYPE=Release \
               ../
         make -j8


gmake
~~~~~
   
.. tabs::
   
   .. tab:: CPU

      .. code:: bash

         make -C exec -j8 \
              COMP=gnu \
              USE_MPI=TRUE \
              USE_OMP=FALSE \
              USE_CUDA=FALSE \
              USE_TINY_PROFILE=FALSE \
              USE_CSG=FALSE \
              USE_HYPRE=FALSE \
              DEBUG=FALSE
         

   .. tab:: GPU

      .. code:: bash
         
         make -C exec -j8 
              COMP=gnu \
              USE_MPI=TRUE \
              USE_OMP=FALSE \
              USE_CUDA=TRUE \
              CUDA_ARCH=8.0 \
              USE_TINY_PROFILE=FALSE \
              USE_CSG=FALSE \
              USE_HYPRE=FALSE \
              DEBUG=FALSE


   .. tab:: CPU-full

      .. code:: bash

         export HYPRE_DIR=$HYPRE_INSTALL_DIR
         export HYPRE_HOME=$HYPRE_DIR

         export ASCENT_DIR=$ASCENT_INSTALL_DIR
         export CONDUIT_DIR=$ASCENT_DIR

         export CSGEB_HOME=$CSG_LIB_DIR
         export LDFLAGS="-lgmp -lmpfr -L$CSG_INSTALL_DIR/lib -Wl,-rpath=$CSG_INSTALL_DIR/lib"

         make -C exec -j8 \
              COMP=gnu \
              USE_MPI=TRUE \
              USE_OMP=FALSE \
              USE_CUDA=FALSE \
              USE_TINY_PROFILE=FALSE \
              USE_CSG=TRUE \
              USE_HYPRE=TRUE \
              USE_ASCENT=TRUE \
              USE_CONDUIT=TRUE \
              DEBUG=FALSE


   .. tab:: GPU-full

      .. code:: bash
         
         export HYPRE_DIR=$HYPRE_INSTALL_DIR
         export HYPRE_HOME=$HYPRE_DIR

         export ASCENT_DIR=$ASCENT_INSTALL_DIR
         export CONDUIT_DIR=$ASCENT_DIR

         export CSGEB_HOME=$CSG_LIB_DIR
         export LDFLAGS="-lgmp -lmpfr -L$CSG_INSTALL_DIR/lib -Wl,-rpath=$CSG_INSTALL_DIR/lib"

         make -C exec -j8 COMP=gnu \
              USE_MPI=TRUE \
              USE_OMP=FALSE \
              USE_CUDA=TRUE \
              CUDA_ARCH=8.0 \
              USE_TINY_PROFILE=FALSE \
              USE_CSG=TRUE \
              USE_HYPRE=TRUE \
              USE_ASCENT=TRUE \
              USE_CONDUIT=TRUE \
              DEBUG=FALSE




Optional build dependencies
---------------------------

The following dependencies need to be built and installed 
prior to following any of the full build instructions above. 

#. HYPRE

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
            ./configure --prefix=$HYPRE_INSTALL_DIR \
                        --without-superlu \
                        --disable-bigint \
                        --without-openmp \
                        --enable-shared  \
                        --with-MPI \
                        --with-cuda \
                        --with-gpu-arch='80' \
                        --with-cuda-home=$CUDA_HOME \
                        --enable-cusparse \
                        --enable-curand
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
      cmake -S . -B build -DCMAKE_INSTALL_PREFIX=$CSG_INSTALL_DIR \
                          -DCMAKE_C_COMPILER=$(which cc) \
                          -DCMAKE_CXX_COMPILER=$(which CC)
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

#. CSG EB library  (**gmake**) 

   For the gmake install instructions, you need to install
   `libcsgeb` to `$CSG_LIB_DIR` using either cmake or gmake:

   .. tabs::

      .. tab:: cmake

         .. code:: bash

            cd subprojects/csg-eb

            export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$CSG_INSTALL_DIR

            cmake -S . -B build -DCMAKE_INSTALL_PREFIX=$CSG_LIB_DIR \
                                -DCMAKE_BUILD_TYPE=Release

            cd build
            make -j8 install

      .. tab:: gmake

         .. code:: bash

            make -C subprojects/csg-eb install DESTDIR=$CSG_LIB_DIR \
            PEGTL_HOME=$CSG_INSTALL_DIR \
            CGAL_HOME=$CSG_INSTALL_DIR \
            CATCH2_HOME=$CSG_INSTALL_DIR \
            ENABLE_CGAL=TRUE

#. Conduit

   .. code:: bash

      git clone --recursive https://github.com/LLNL/conduit.git
      pushd conduit/
      git checkout v0.8.4
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

* **sinfo** see available/allocated resources
* **sbatch runit_cpu.sh** submit a cpu job to the queue
* **squeue -u USER** check job status of user USER
* **squeue -p PARTITION** check job status of partition PARTITION
* **scancel JOBID** kill a job with id JOBID
* **salloc --nodes 1 --qos interactive --time 01:00:00 --constraint gpu --gpus 4 --account=<ACCOUNT>** grab 1 GPU node (for up to 1 hrs)

Example run scripts: 

.. tabs::
      
   .. tab:: CPU

      .. code:: bash

         #!/bin/bash
         #SBATCH --job-name run-mfix-exa
         #SBATCH -o stdout.%x-%j
         #SBATCH -e stderr.%x-%j
         #SBATCH --account=<ACCOUNT>
         #SBATCH --qos=<QOS>
         #SBATCH --constraint=cpu
         #SBATCH --time=00:02:00
         #SBATCH --nodes=2
         #SBATCH --ntasks-per-node=16

         # load modules used for build 
         module load PrgEnv-gnu/8.3.3
         module load cmake/3.22.0

         srun -n 32 --cpu-bind=cores -c 16 ./mfix inputs > screen.txt

   .. tab:: GPU

      .. code:: bash

         #!/bin/bash
         #SBATCH --job-name run-mfix-exa
         #SBATCH -o stdout.%x-%j
         #SBATCH -e stderr.%x-%j
         #SBATCH --account=<ACCOUNT>
         #SBATCH --qos=<QOS>
         #SBATCH --constraint=gpu
         #SBATCH --time=00:02:00
         #SBATCH --nodes=2
         #SBATCH --ntasks-per-node=4  #fixed unless --ntasks/4 is non-int
         #SBATCH --cpus-per-task=32   #fixed
         #SBATCH --gpus-per-task=1    #fixed
         #SBATCH --gpu-bind=single:1  #fixed

         nrs=8

         # load modules used for build 
         module load PrgEnv-gnu/8.3.3
         module load cudatoolkit/11.5
         module load cmake/3.22.0

         # GPU-aware MPI
         export MPICH_GPU_SUPPORT_ENABLED=1

         # necessary to use CUDA-Aware MPI and run a job
         export CRAY_ACCEL_TARGET=nvidia80

         srun -n $nrs -G $nrs -c 1 --gpus-per-task 1 --gpu-bind=single:1 ./mfix inputs > screen.txt
